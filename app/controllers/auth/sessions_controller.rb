module Auth
  class SessionsController < ApplicationController
    include CurrentUserConcern

    def create
      user = User.find_by(email: session_params[:email]).try(:authenticate, session_params[:password])

      if user
        session[:user_id] = user.id
        render json: {
                 success: 1,
                 logged_in: true,
                 user: user,
               }, status: :created
      else
        render json: {
                 success: 0,
                 message: "Incorrect email or password",
                 logged_in: false,
               }, status: 401
      end
    end

    def logout
      reset_session
      render json: {
               success: 1,
               status: 200,
               logged_out: true,
             }
    end

    def status
      if @current_user
        render json: {
                 success: 1,
                 logged_in: true,
                 user: @current_user,
               }
      else
        reset_session
        render json: {
                 success: 1,
                 logged_in: false,
               }
      end
    end

    private

    def session_params
      params.required(:user).permit(:email, :password)
    end
  end
end
