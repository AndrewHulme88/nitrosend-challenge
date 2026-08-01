require "test_helper"

class ConsentPolicyTest < ActiveSupport::TestCase
  test "a read asks for nothing" do
    consequence = ConsentPolicy.resolve(tool: "nitro_query")

    assert_equal "read", consequence.reversibility
    assert_equal "none", consequence.consent_level
  end

  test "composing a draft and sending it live are graded differently" do
    draft = ConsentPolicy.resolve(tool: "nitro_compose_campaign")
    send = ConsentPolicy.resolve(tool: "nitro_control_delivery", arguments: { operation: "live" })

    # Both carry destructiveHint: true in the real manifest, which is the
    # problem this solves.
    assert_equal "notice", draft.consent_level
    assert_equal "verify", send.consent_level
  end

  test "reach separates a test send from a live one" do
    test_send = ConsentPolicy.resolve(tool: "nitro_send_test_message")
    live_send = ConsentPolicy.resolve(tool: "nitro_control_delivery", arguments: { operation: "live" })

    assert_equal "irreversible", test_send.reversibility
    assert_equal "irreversible", live_send.reversibility

    assert_equal "confirm", test_send.consent_level
    assert_equal "verify", live_send.consent_level
  end

  test "consequence varies by operation within one tool" do
    levels = %w[pause resume approve schedule live].to_h do |operation|
      [ operation, ConsentPolicy.resolve(tool: "nitro_control_delivery", arguments: { operation: }).consent_level ]
    end

    assert_equal(
      { "pause" => "notice", "resume" => "notice", "approve" => "notice",
        "schedule" => "verify", "live" => "verify" },
      levels
    )
  end

  test "a consequential action names its preview and rehearsal tools" do
    consequence = ConsentPolicy.resolve(tool: "nitro_control_delivery", arguments: { operation: "live" })

    assert_equal "nitro_review_delivery", consequence.preview_with
    assert_equal "nitro_send_test_message", consequence.rehearse_with
  end

  test "argument keys may be strings or symbols" do
    with_symbol = ConsentPolicy.resolve(tool: "nitro_control_delivery", arguments: { operation: "live" })
    with_string = ConsentPolicy.resolve(tool: "nitro_control_delivery", arguments: { "operation" => "live" })

    assert_equal with_symbol, with_string
  end

  test "an unknown tool fails closed" do
    consequence = ConsentPolicy.resolve(tool: "nitro_tool_that_does_not_exist")

    assert_not consequence.declared?
    assert_equal "irreversible", consequence.reversibility
    assert_equal "unknown", consequence.reach
    assert_equal "verify", consequence.consent_level
  end

  test "an undeclared operation on a known tool fails closed" do
    # Present in the real manifest, deliberately absent from mine.
    consequence = ConsentPolicy.resolve(tool: "nitro_control_delivery", arguments: { operation: "delete" })

    assert_not consequence.declared?
    assert_equal "verify", consequence.consent_level
  end

  test "a tool whose consequence varies by operation fails closed without one" do
    consequence = ConsentPolicy.resolve(tool: "nitro_control_delivery")

    assert_not consequence.declared?
    assert_equal "verify", consequence.consent_level
  end

  test "an invalid manifest value fails closed rather than resolving to nil" do
    broken = { "nitro_typo" => { "reversibility" => "reversable", "reach" => "internal" } }

    with_manifest(broken) do
      consequence = ConsentPolicy.resolve(tool: "nitro_typo")

      assert_not consequence.declared?
      assert_equal "verify", consequence.consent_level
    end
  end

  test "no undeclared input resolves below the strongest level" do
    undeclared = [
      { tool: "unknown_tool", arguments: {} },
      { tool: "nitro_control_delivery", arguments: {} },
      { tool: "nitro_control_delivery", arguments: { operation: "cancel" } },
      { tool: "nitro_control_delivery", arguments: { operation: "archive" } },
      { tool: "nitro_control_delivery", arguments: { operation: "" } },
      { tool: "nitro_control_delivery", arguments: { operation: nil } },
      { tool: "nitro_control_delivery", arguments: { unrelated: "live" } }
    ]

    undeclared.each do |call|
      consequence = ConsentPolicy.resolve(**call)

      assert_equal "verify", consequence.consent_level,
        "#{call.inspect} resolved to #{consequence.consent_level}"
    end
  end

  test "every entry in the shipped manifest declares valid values" do
    ConsentPolicy.manifest.each do |tool, entry|
      declarations = entry["varies_by"] ? entry.fetch("cases").values : [ entry ]

      declarations.each do |declaration|
        assert_includes ConsentPolicy::REVERSIBILITY, declaration["reversibility"], tool
        assert_includes ConsentPolicy::REACH, declaration["reach"], tool
      end
    end
  end

  private

  def with_manifest(manifest)
    original = ConsentPolicy.instance_variable_get(:@manifest)
    ConsentPolicy.instance_variable_set(:@manifest, manifest)
    yield
  ensure
    ConsentPolicy.instance_variable_set(:@manifest, original)
  end
end
