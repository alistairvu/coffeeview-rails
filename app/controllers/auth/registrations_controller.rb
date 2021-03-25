module Auth
  class RegistrationsController < ApplicationController
    def create
      user = User.create!(registration_params)

      if user
        session[:user_id] = user.id
        render json: {
                 status: :created,
                 logged_in: true,
                 user: user,
               }
      else
        render json: {
                 status: 500,
               }
      end
    end

    private

    def registration_params
      params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, :is_admin)
    end
  end
end
