class CafesController < ApplicationController
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
  end

  def delete
  end

  private

  def cafe_params
    params.require(:cafe).perimt(:name, :address, :district, :description, :price, :hours, :images)
  end
end
