Rails.application.routes.draw do
  # Returns 200 if the app boots with no exceptions. Used by the platform's
  # uptime check, and kept separate from /api/health, which reports detail.
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    get "health", to: "health#show"
    get "conversation", to: "conversation#show"

    # Claim every remaining /api path so an unknown endpoint answers with the
    # error envelope instead of the SPA document.
    match "*unmatched", to: "errors#not_found", via: :all
  end

  root "spa#show"

  # Client side routes. Anything Rails owns is excluded so this cannot swallow
  # the API, asset requests or the platform health check.
  get "*path", to: "spa#show", constraints: ->(request) {
    !request.path.start_with?("/api", "/rails", "/up", "/assets")
  }
end
