# The scripted conversation, with every tool call graded as it is served.
#
# Consequence is deliberately not stored alongside the script. It is resolved
# from ConsentPolicy on the way out, so the interface is driven by the manifest
# rather than by a decision someone made once while writing the fixture.
class Conversation
  PATH = Rails.root.join("config/conversation.yml")

  class << self
    def steps
      script.fetch("steps").map do |step|
        step["type"] == "action" ? graded(step) : step
      end
    end

    def script
      # Reload in development so editing the fixture is reflected without a
      # server restart. Production keeps the memoised copy.
      return YAML.safe_load_file(PATH) if Rails.env.development?

      @script ||= YAML.safe_load_file(PATH).freeze
    end

    private

    def graded(step)
      step.merge(
        "consequence" => ConsentPolicy.resolve(
          tool: step.fetch("tool"),
          arguments: step["arguments"] || {}
        )
      )
    end
  end
end
