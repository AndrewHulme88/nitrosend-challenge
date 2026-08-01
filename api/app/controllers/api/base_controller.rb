module Api
  # Every API response uses one envelope, so a client can tell success from
  # failure without inspecting the shape of the payload. Nitrosend's own CLI
  # publishes a versioned envelope with an `ok` flag; this mirrors that.
  class BaseController < ApplicationController
    SCHEMA_VERSION = 1

    rescue_from ActiveRecord::RecordNotFound, with: :not_found

    private

    def render_data(data, status: :ok, meta: {})
      render status: status, json: {
        schema_version: SCHEMA_VERSION,
        ok: true,
        data: data,
        meta: meta
      }
    end

    # `retriable` tells the client whether trying again could succeed, which is
    # the difference between offering a retry and explaining a dead end.
    def render_error(code:, message:, status:, retriable: false)
      render status: status, json: {
        schema_version: SCHEMA_VERSION,
        ok: false,
        error: { code: code, message: message, retriable: retriable }
      }
    end

    def not_found
      render_error(
        code: "not_found",
        message: "That resource does not exist.",
        status: :not_found
      )
    end
  end
end
