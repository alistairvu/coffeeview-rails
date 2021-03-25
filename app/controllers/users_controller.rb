class UsersController < ApplicationController
  include CurrentUserConcern
  before_action :check_login

  def show
    user = User.find(params[:id])
    render json: {
             status: :success,
             user: user,
           }
  end

  def update
    user = User.find(params[:id])

    if user.update(user_params)
      render json: {
               status: :success,
               updated: true,
               user: user,
             }
    else
      render json: {
               status: 500,
             }
    end
  end

  def destroy
    user = User.find(params[:id])

    if user.destroy
      reset_session
      render json: {
               status: :success,
               destroyed: true,
             }
    else
      render json: {
               status: 500,
             }
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :password, :password_confirmation, :is_admin, :email)
  end

  def check_login
    unless @current_user && (@current_user.id == params[:id].to_i || @current_user.is_admin)
      render json: {
        message: "You cannot do this action",
      }, status: 401
    end
  end
end
