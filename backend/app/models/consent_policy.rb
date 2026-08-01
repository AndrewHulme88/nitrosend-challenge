# Resolves how much consent a tool call should require.
#
# The MCP manifest describes consequence with `destructiveHint`, one boolean per
# tool. That boolean covers both composing a draft nobody sees and irreversibly
# emailing an entire audience, so an interface driven by it must either confirm
# both the same way or neither. It also cannot vary within a tool, though
# `nitro_control_delivery` accepts ten operations ranging from `pause` to `live`.
#
# This resolves two axes instead, from the arguments of the call rather than the
# name of the tool.
class ConsentPolicy
  REVERSIBILITY = %w[read reversible irreversible].freeze
  REACH = %w[internal nominated audience unknown].freeze

  # Irreversible to five addresses you named is not irreversible to a segment
  # you have not counted. Reach is what separates a test send from a live one;
  # only `confirm_send_to_all` expresses it, for a single case of a single tool.
  REACH_REQUIRING_VERIFICATION = %w[audience unknown].freeze

  # Assume the worst of anything undeclared. The alternative fails open: adding
  # a tool, or an operation to an existing tool, would create an action that
  # sends without asking until someone remembered to classify it.
  UNDECLARED = { "reversibility" => "irreversible", "reach" => "unknown" }.freeze

  MANIFEST_PATH = Rails.root.join("config/consent_manifest.yml")

  Consequence = Data.define(
    :tool, :operation, :reversibility, :reach, :preview_with, :rehearse_with, :declared
  ) do
    # What the interface owes the operator before acting.
    #
    #   none    — no state changes, so nothing to consent to
    #   notice  — act, then show what changed and how to undo it
    #   confirm — approval before acting
    #   verify  — approval before acting, having seen the thing and its true reach
    def consent_level
      case reversibility
      when "read" then "none"
      when "reversible" then "notice"
      else
        REACH_REQUIRING_VERIFICATION.include?(reach) ? "verify" : "confirm"
      end
    end

    def declared? = declared

    # The level travels with the axes it was derived from, so the interface can
    # explain a decision rather than only obey it.
    def as_json(*) = to_h.merge(consent_level: consent_level)
  end

  class << self
    def resolve(tool:, arguments: {})
      arguments = arguments.to_h { |key, value| [ key.to_s, value ] }
      declaration = declaration_for(tool, arguments)

      Consequence.new(
        tool: tool,
        operation: operation_for(tool, arguments),
        reversibility: declaration["reversibility"],
        reach: declaration["reach"],
        preview_with: declaration["preview_with"],
        rehearse_with: declaration["rehearse_with"],
        declared: !declaration.equal?(UNDECLARED)
      )
    end

    def manifest
      @manifest ||= YAML.safe_load_file(MANIFEST_PATH).freeze
    end

    private

    def declaration_for(tool, arguments)
      entry = manifest[tool]
      return UNDECLARED if entry.nil?

      entry = entry["varies_by"] ? case_for(entry, arguments) : entry
      valid?(entry) ? entry : UNDECLARED
    end

    # A tool whose consequence varies by argument is undeclared until that
    # argument is known, rather than falling back to the tool's other cases.
    def case_for(entry, arguments)
      key = arguments[entry["varies_by"]]
      entry.dig("cases", key.to_s) if key
    end

    def operation_for(tool, arguments)
      key = manifest.dig(tool, "varies_by")
      arguments[key]&.to_s if key
    end

    # Values are checked rather than trusted, so a typo in the manifest fails
    # closed like anything else undeclared instead of resolving to nil.
    def valid?(entry)
      entry.is_a?(Hash) &&
        REVERSIBILITY.include?(entry["reversibility"]) &&
        REACH.include?(entry["reach"])
    end
  end
end
