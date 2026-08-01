module Api
  class HealthController < BaseController
    def show
      render_data({
        environment: Rails.env,
        time: Time.current.iso8601
      })
    end
  end
end
