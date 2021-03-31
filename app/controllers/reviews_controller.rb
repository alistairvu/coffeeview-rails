class ReviewsController < ApplicationController
  include CurrentUserConcern
  before_action :check_login, except: [:cafe]

  def cafe
    cafe = Cafe.find_by(slug: params[:id])

    if cafe and cafe.is_shown
      render json: {
        success: 1,
        reviews: cafe.reviews.order("created_at DESC").map { |review| review_json(review) },
      }, status: :success
    else
      render json: {
        status: 1,
        message: "No matching cafe found",
      }, status: :not_found
    end
  end

  def create
    review = Review.create!(review_params)

    if review
      render json: {
        success: 1,
        review: review_json(review),
      }, status: :created
    else
      render json: {
        success: 0,
        message: "An error occurred",
      }, status: 500
    end
  end

  def destroy
    review = Review.find(params[:id])

    if review && @current_user.id == review.user_id
      review.destroy
      render json: {
        success: 1,
      }, status: :success
    elsif @review && @current_user.id == review.user_id
      render json: {
        success: 0,
        message: "You cannot delete this review",
      }, status: 401
    else
      render json: {
        success: 0,
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
      cafe_slug: review[:cafe_slug],
    }
  end

  def check_login
    unless @current_user
      render json: {
               success: 0,
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
