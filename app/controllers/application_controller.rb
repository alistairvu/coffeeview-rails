class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  def render_unprocessable_entity_response(exception)
    puts exception.message
    render json: { success: 0, message: exception.message }, status: :unprocessable_entity
  end

  def render_not_found_response(exception)
    render json: { success: 0, message: exception.message }, status: :not_found
  end
end
