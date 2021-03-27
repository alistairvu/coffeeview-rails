class AddAvgScoreToCafe < ActiveRecord::Migration[6.1]
  def change
    add_column :cafes, :avg_rating, :float, default: 0
  end
end
