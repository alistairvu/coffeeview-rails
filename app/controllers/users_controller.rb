class UsersController < ApplicationController
  include CurrentUserConcern

  def show
    if @current_user && (@current_user.id == params[:id].to_i || @current_user.is_admin)
      user = User.find(params[:id])
      render json: {
        status: :success,
        user: user,
      }
    else
      render json: {
        message: "You cannot read this user's data",
      }, status: 401
    end
  end

  def update
    if @current_user && (@current_user.id == params[:id].to_i || @current_user.is_admin)
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
    else
      render json: {
        message: "You cannot update this user",
      }, status: 401
    end
  end

  def destroy
    if @current_user && (@current_user.id == params[:id].to_i || @current_user.is_admin)
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
    else
      render json: {
        message: "You cannot delete this user",
      }, status: 401
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :password, :password_confirmation, :is_admin, :email)
  end
end
