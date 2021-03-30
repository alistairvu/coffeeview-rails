class AddUserReferenceToCafes < ActiveRecord::Migration[6.1]
  def change
    add_reference :cafes, :user, null: false, foreign_key: true, default: User.first.id
  end
end
