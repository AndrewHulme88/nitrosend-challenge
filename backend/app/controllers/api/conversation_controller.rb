module Api
  class ConversationController < BaseController
    def show
      render_data({ steps: Conversation.steps })
    end
  end
end
