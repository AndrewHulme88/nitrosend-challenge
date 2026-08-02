# What consent looks like when driven by current MCP annotations alone.
#
# `destructiveHint` is one boolean per tool. It cannot distinguish composing a
# draft from sending to an audience, and it cannot vary by operation. The
# interface that follows has only two levels: do nothing, or ask once.
class CurrentConsent
  PATH = Rails.root.join("config/current_annotations.yml")

  # Unknown tools are treated as destructive. Same fail-closed instinct as
  # ConsentPolicy: an undeclared tool should not run quietly.
  UNDECLARED = { "read_only_hint" => false, "destructive_hint" => true }.freeze

  Annotation = Data.define(:tool, :read_only, :destructive) do
    def consent_level
      return "none" if read_only
      return "confirm" if destructive

      "none"
    end

    def as_json(*)
      {
        tool: tool,
        read_only_hint: read_only,
        destructive_hint: destructive,
        consent_level: consent_level
      }
    end
  end

  class << self
    def resolve(tool:)
      entry = annotations[tool] || UNDECLARED

      Annotation.new(
        tool: tool,
        read_only: entry.fetch("read_only_hint"),
        destructive: entry.fetch("destructive_hint")
      )
    end

    def annotations
      return YAML.safe_load_file(PATH) if Rails.env.development?

      @annotations ||= YAML.safe_load_file(PATH).freeze
    end
  end
end
