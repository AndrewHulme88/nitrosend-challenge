module Api
  # Unmatched /api paths must return the envelope rather than falling through
  # to the catch-all route, which would answer an API call with the SPA.
  class ErrorsController < BaseController
    def not_found
      super
    end
  end
end
