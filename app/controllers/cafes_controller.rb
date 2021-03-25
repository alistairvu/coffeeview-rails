class CafesController < ApplicationController
  include CurrentUserConcern
  before_action :check_admin, only: [:update, :delete]

  def index
    page_number = params[:page].to_i > 1 ? params[:page].to_i : 1
    offset = (page_number - 1) * 12
    cafes = Cafe.limit(12).offset(offset)
    render json: {
      status: 200,
      offset: offset,
      cafes: cafes,
    }
  end

  def create
    cafe = Cafe.create!(cafe_params)

    if cafe
      render json: {
        status: :created,
        success: true,
        cafe: cafe,
      }
    else
      render json: {
        status: 500,
        success: false,
        message: "An error occurred",
      }, status: 500
    end
  end

  def show
    cafe = Cafe.find_by(slug: params[:id])

    if cafe
      render json: {
        status: :success,
        cafe: cafe,
      }
    else
      render json: {
        status: :not_found,
        message: "No matching cafe found",
      }, stauts: :not_found
    end
  end

  def update
    cafe = Cafe.find_by(slug: params[:id])

    if cafe.update(cafe_params)
      render json: {
        status: :success,
        updated: true,
        cafe: cafe,
      }
    else
      render json: {
        status: :not_found,
        message: "No matching cafe found",
      }, stauts: :not_found
    end
  end

  def delete
    cafe = Cafe.find_by(slug: params[:id])

    if cafe.destroy
      render json: {
        status: :success,
        destroyed: true,
      }
    else
      render json: {
        status: :not_found,
        message: "No matching cafe found",
      }, stauts: :not_found
    end
  end

  private

  def cafe_params
    params.require(:cafe).perimt(:name, :address, :district, :description, :price, :hours, :images)
  end

  def check_admin
    unless @current_user && @current_user.is_admin
      render json: {
        message: "You cannot do this action",
      }, status: 401
    end
  end
end
