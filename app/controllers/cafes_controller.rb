class CafesController < ApplicationController
  include CurrentUserConcern
  before_action :check_admin, only: [:update, :delete]
  before_action :check_user, only: [:create]

  def index
    page_number = params[:page].to_i > 1 ? params[:page].to_i : 1
    offset = (page_number - 1) * 12
    cafes = Cafe.where(is_shown: true).limit(12).offset(offset)
    page_count = (Cafe.where(is_shown: true).count.to_f / 12).ceil
    render json: {
      success: 1,
      offset: offset,
      cafes: cafes,
      page_count: page_count,
    }
  end

  def create
    cafe = Cafe.create!(cafe_params)
    cafe[:user_id] = @current_user.id

    if cafe
      render json: {
        success: 1,
        cafe: cafe,
      }, status: :created
    else
      render json: {
        success: 0,
        message: "An error occurred",
      }, status: 500
    end
  end

  def show
    cafe = Cafe.find_by(slug: params[:id])

    if cafe and cafe.is_shown
      render json: {
        success: 1,
        cafe: cafe,
      }, status: :success
    else
      render json: {
        success: 0,
        message: "No matching cafe found",
      }, status: :not_found
    end
  end

  def update
    cafe = Cafe.find_by(slug: params[:id])

    if cafe.update(cafe_params)
      render json: {
        success: 1,
        cafe: cafe,
      }, status: :success
    else
      render json: {
        success: 0,
        message: "No matching cafe found",
      }, stauts: :not_found
    end
  end

  def delete
    cafe = Cafe.find_by(slug: params[:id])

    if cafe.destroy
      render json: {

        success: 1,
      }, status: :success
    else
      render json: {

        success: 0,
        message: "No matching cafe found",
      }, stauts: :not_found
    end
  end

  def search
    page_number = params[:page].to_i > 1 ? params[:page].to_i : 1
    offset = (page_number - 1) * 12
    parameter = params[:q].downcase
    results = Cafe.all.where("lower(name) LIKE :search", search: "%#{parameter}%").limit(12).offset(offset)
    page_count = (Cafe.all.where("lower(name) LIKE :search", search: "%#{parameter}%").size.to_f / 12).ceil
    render json: {
      success: 1,
      offset: offset,
      results: results.limit(12).offset(offset),
      page_count: page_count,
    }, status: 200
  end

  private

  def cafe_params
    params.require(:cafe).permit(:name, :address, :district, :description, :price, :hours, :images => [], :tags => [])
  end

  def check_admin
    unless @current_user && @current_user.is_admin
      render json: {
        success: 0,
        message: "You cannot do this action",
      }, status: 401
    end
  end

  def check_user
    unless @current_user
      render json: {
        success: 0,
        message: "You cannot do this action",
      }, status: 401
    end
  end
end
