class Cafe < ApplicationRecord
  before_validation :slugify

  has_many :reviews

  validates_uniqueness_of :slug
  self.table_name = "cafes"

  private

  def slugify
    token = rand(36 ** 8).to_s(36)
    self.slug ||= "#{self.name.parameterize}-#{token}"
  end
end
