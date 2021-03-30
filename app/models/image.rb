class Image < ApplicationRecord
  include Rails.application.routes.url_helpers

  has_one_attached :image

  validates_presence_of :image

  def get_image_url
    url_for(self.image)
  end
end
