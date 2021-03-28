class Review < ApplicationRecord
  belongs_to :user
  belongs_to :cafe
  after_save :set_avg_score
  after_destroy :set_avg_score

  validates_presence_of :title, :content, :rating

  def set_avg_score
    @cafe = Cafe.find(self.cafe_id)
    if @cafe.reviews.empty?
      @cafe.avg_rating = 0
      @cafe.update(avg_rating: 0)
    else
      @cafe.update(avg_rating: @cafe.reviews.average(:rating).round(2).to_f)
    end
  end
end
