class ImagesController < ApplicationController
  def create
    @image = Image.create!(image_params)

    if @image.valid?
      render json: { success: 1, id: @image.id, image_url: @image.get_image_url }
    else
      render json: { success: 0, errors: @image.errors }, status: 400
    end
  end

  private

  def image_params
    params.permit(:image)
  end
end
