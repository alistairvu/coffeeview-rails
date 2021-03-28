class Cafe < ApplicationRecord
  before_create :slugify

  has_many :reviews

  validates_uniqueness_of :slug
  self.table_name = "cafes"

  private

  def slugify
    token = SecureRandom.urlsafe_base64(8)
    self.slug ||= "#{self.name.parameterize}-#{token}"
  end
end
