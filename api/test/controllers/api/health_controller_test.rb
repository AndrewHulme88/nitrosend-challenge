require "test_helper"

module Api
  class HealthControllerTest < ActionDispatch::IntegrationTest
    test "reports status in the response envelope" do
      get "/api/health"

      assert_response :success
      body = JSON.parse(response.body)

      assert_equal 1, body["schema_version"]
      assert body["ok"]
      assert_equal "test", body["data"]["environment"]
      assert body["data"]["database"]
    end

    test "unknown api paths return the error envelope rather than the SPA" do
      get "/api/does-not-exist"

      assert_response :not_found
      body = JSON.parse(response.body)

      refute body["ok"]
      assert_equal "not_found", body["error"]["code"]
      refute body["error"]["retriable"]
    end

    test "unknown api paths reject every verb" do
      post "/api/does-not-exist"

      assert_response :not_found
      assert_equal "not_found", JSON.parse(response.body).dig("error", "code")
    end
  end
end
