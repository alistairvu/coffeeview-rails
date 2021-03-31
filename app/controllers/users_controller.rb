class UsersController < ApplicationController
  include CurrentUserConcern
  before_action :check_login
  before_action :check_admin, only: [:index]

  def index
    page_number = params[:page].to_i > 1 ? params[:page].to_i : 1
    offset = (page_number - 1) * 12
    users = User.all.limit(12).offset(offset)
    page_count = (User.count.to_f / 12).ceil
    render json: {
      status: :success,
      users: users,
      page_count: page_count,
    }
  end

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
               success: true,
               user: user,
             }
    else
      render json: {
               status: 500,
               success: false,
             }
    end
  end

  def destroy
    user = User.find(params[:id])

    if user.destroy
      reset_session
      render json: {
               status: :success,
               success: true,
             }
    else
      render json: {
               status: 500,
               success: false,
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

  def check_admin
    unless @current_user && @current_user.is_admin
      render json: {
        message: "You cannot do this action",
      }, status: 401
    end
  end
end
