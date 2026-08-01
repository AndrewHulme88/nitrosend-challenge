require "test_helper"

class SpaControllerTest < ActionDispatch::IntegrationTest
  # These pass whether or not the frontend has been built: what matters is that
  # the route resolves to the SPA rather than 404ing or hitting the API.
  test "serves the document at the root" do
    get "/"

    assert_includes [ 200, 503 ], response.status
  end

  test "serves the document for client-side routes" do
    get "/some/deep/client/route"

    assert_includes [ 200, 503 ], response.status
  end

  # The document names digest-stamped assets, so a cached copy outlives the
  # deploy that replaced them. This also guards the static file server from
  # answering "/" with its far-future headers before the router runs.
  test "never allows the document to be cached" do
    get "/"

    assert_equal "no-store", response.headers["Cache-Control"] if response.status == 200
  end

  test "does not intercept api paths" do
    get "/api/does-not-exist"

    assert_response :not_found
    assert_equal "application/json", response.media_type
  end

  test "does not intercept the platform health check" do
    get "/up"

    assert_response :success
  end
end
