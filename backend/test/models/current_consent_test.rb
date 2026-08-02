require "test_helper"

class CurrentConsentTest < ActiveSupport::TestCase
  test "a read asks for nothing" do
    annotation = CurrentConsent.resolve(tool: "nitro_query")

    assert annotation.read_only
    refute annotation.destructive
    assert_equal "none", annotation.consent_level
  end

  test "composing a draft and sending it live look the same" do
    draft = CurrentConsent.resolve(tool: "nitro_compose_campaign")
    send = CurrentConsent.resolve(tool: "nitro_control_delivery")

    # Both are destructiveHint: true in the real manifest. That is the
    # limitation the proposed metadata exists to fix.
    assert_equal "confirm", draft.consent_level
    assert_equal "confirm", send.consent_level
  end

  test "an unknown tool fails closed" do
    annotation = CurrentConsent.resolve(tool: "nitro_tool_that_does_not_exist")

    assert annotation.destructive
    assert_equal "confirm", annotation.consent_level
  end
end
