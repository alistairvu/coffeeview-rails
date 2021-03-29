class CafesController < ApplicationController
  include CurrentUserConcern
  before_action :check_admin, only: [:update, :delete]

  def index
    page_number = params[:page].to_i > 1 ? params[:page].to_i : 1
    offset = (page_number - 1) * 12
    cafes = Cafe.where(is_shown: true).limit(12).offset(offset)
    page_count = (Cafe.count.to_f / 12).ceil
    render json: {
      status: 200,
      offset: offset,
      cafes: cafes,
      page_count: page_count,
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

    if cafe and cafe.is_shown
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
        success: true,
        cafe: cafe,
      }
    else
      render json: {
        status: :not_found,
        success: false,
        message: "No matching cafe found",
      }, stauts: :not_found
    end
  end

  def delete
    cafe = Cafe.find_by(slug: params[:id])

    if cafe.destroy
      render json: {
        status: :success,
        success: true,
      }
    else
      render json: {
        status: :not_found,
        success: false,
        message: "No matching cafe found",
      }, stauts: :not_found
    end
  end

  def search
    parameter = params[:q].downcase
    results = Cafe.all.where("lower(name) LIKE :search", search: "%#{parameter}%")
    puts results
    render json: {
      status: 200,
      results: results,
    }
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
