require_relative "boot"

# Load only the frameworks this application uses. It is a JSON API backed by
# Postgres that also serves the built frontend, so Active Storage, Action
# Mailer, Action Cable, Action Mailbox, Action Text and Active Job are all
# dead weight at boot.
require "rails"
require "active_model/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Api
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 8.1

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w[assets tasks])

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # The static file server would otherwise answer "/" with public/index.html
    # before the router runs, which would serve the SPA shell with the
    # far-future cache headers meant for digest-stamped assets. Naming a file
    # that does not exist sends "/" to SpaController, which sets no-store.
    config.public_file_server.index_name = "index_served_by_spa_controller"

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true
  end
end
