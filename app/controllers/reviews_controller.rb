class ReviewsController < ApplicationController
  include CurrentUserConcern
  before_action :check_login, except: [:cafe]

  def cafe
    cafe = Cafe.find_by(slug: params[:id])

    if cafe and cafe.is_shown
      render json: {
        status: :success,
        reviews: cafe.reviews.order("created_at DESC").map { |review| review_json(review) },
      }
    else
      render json: {
        status: :not_found,
        message: "No matching cafe found",
      }, stauts: :not_found
    end
  end

  def create
    review = Review.create!(review_params)

    if review
      render json: {
        status: :created,
        success: true,
        review: review_json(review),
      }
    else
      render json: {
        status: 500,
        success: false,
        message: "An error occurred",
      }, status: 500
    end
  end

  def destroy
    review = Review.find(params[:id])

    if review && @current_user.id == review.user_id
      review.destroy
      render json: {
        status: :success,
        destroyed: true,
      }
    elsif @review && @current_user.id == review.user_id
      render json: {
        status: 401,
        success: false,
        message: "You cannot delete this review",
      }, status: 401
    else
      render json: {
        status: 500,
        destroyed: false,
        message: "An error occurred",
      }, status: 500
    end
  end

  private

  def review_json(review)
    user = User.find(review[:user_id])
    cafe = Cafe.find(review[:cafe_id])
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

  def check_login
    unless @current_user
      render json: {
               message: "You cannot do this action",
             }, status: 401
    end
  end

  def review_params
    body_params = params.require(:review).permit(:cafe_id, :title, :rating, :content)
    body_params[:user_id] = @current_user.id
    body_params
  end
end
