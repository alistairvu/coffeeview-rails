module Auth
  class SessionsController < ApplicationController
    include CurrentUserConcern

    def create
      user = User.find_by(email: session_params[:email]).try(:authenticate, session_params[:password])

      if user
        puts "Found"
        session[:user_id] = user.id
        render json: {
                 status: :created,
                 logged_in: true,
                 user: user,
               }
      else
        puts "Not found"
        render json: {
                 message: "Incorrect email or password",
               }, status: 401
      end
    end

    def logout
      reset_session
      render json: {
               status: 200,
               logged_out: true,
             }
    end

    def logged_in
      if @current_user
        render json: {
                 logged_in: true,
                 user: @current_user,
               }
      else
        render json: {
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
