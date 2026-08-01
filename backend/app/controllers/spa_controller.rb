# Serves the built Vue application. Every non-API path returns the same
# document and vue-router resolves the route on the client.
class SpaController < ApplicationController
  def show
    unless index_file.exist?
      return render plain: "Frontend not built. Run `npm run build` in ./frontend.",
                    status: :service_unavailable
    end

    # The document references digest-stamped assets, so caching it would leave
    # returning clients asking for asset filenames that a deploy has removed.
    response.set_header("Cache-Control", "no-store")
    send_file index_file, type: "text/html", disposition: "inline"
  end

  private

  def index_file
    Rails.public_path.join("index.html")
  end
end
