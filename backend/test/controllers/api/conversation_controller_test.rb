require "test_helper"

module Api
  class ConversationControllerTest < ActionDispatch::IntegrationTest
    test "serves the script in the response envelope" do
      get "/api/conversation"

      assert_response :success
      body = JSON.parse(response.body)

      assert_equal 1, body["schema_version"]
      assert body["ok"]
      assert_predicate body.dig("data", "steps"), :any?
    end

    test "the script covers all three consent levels in order" do
      get "/api/conversation"

      levels = actions.map { |action| action.dig("consequence", "consent_level") }

      assert_equal %w[none notice verify], levels
    end

    test "consequence is resolved by the policy rather than stored in the script" do
      get "/api/conversation"

      actions.each do |action|
        expected = ConsentPolicy.resolve(
          tool: action["tool"],
          arguments: action["arguments"] || {}
        )

        assert_equal expected.as_json.deep_stringify_keys, action["consequence"]
      end
    end

    test "the script does not declare consequence itself" do
      # If it did, the interface could disagree with the policy that governs it.
      Conversation.script.fetch("steps").each do |step|
        assert_not step.key?("consequence"), step["tool"]
      end
    end

    private

    def actions
      JSON.parse(response.body)
        .fetch("data").fetch("steps")
        .select { |step| step["type"] == "action" }
    end
  end
end
