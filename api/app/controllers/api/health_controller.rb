module Api
  class HealthController < BaseController
    def show
      render_data({
        environment: Rails.env,
        database: database_connected?,
        time: Time.current.iso8601
      })
    end

    private

    def database_connected?
      ActiveRecord::Base.connection_pool.with_connection do |connection|
        connection.select_value("SELECT 1") == 1
      end
    rescue StandardError
      false
    end
  end
end
