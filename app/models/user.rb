class User < ApplicationRecord
  has_secure_password
  has_many :reviews, dependent: :destroy
  has_many :cafes, dependent: :destroy

  before_save { email.downcase! }

  validates_presence_of :email, :first_name, :last_name
  validates_uniqueness_of :email
end
