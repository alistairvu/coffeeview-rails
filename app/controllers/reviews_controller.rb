class ReviewsController < ApplicationController
  def cafe
    cafe = Cafe.find_by(slug: params[:id])

    if cafe and cafe.is_shown
      render json: {
        status: :success,
        reviews: cafe.reviews.map { |review| review_json(review) },
      }
    else
      render json: {
        status: :not_found,
        message: "No matching cafe found",
      }, stauts: :not_found
    end
  end

  private

  def review_json(review)
    user = User.find(review[:user_id])
    {
      id: review[:id],
      title: review[:title],
      rating: review[:rating],
      content: review[:content],
      user_name: "#{user[:first_name]} #{user[:last_name]}",
      user_id: review[:user_id],
      cafe_id: review[:cafe_id],
    }
  end
end
