class AddTagsToCafe < ActiveRecord::Migration[6.1]
  def change
    add_column :cafes, :tags, :string, array: true, default: []
  end
end
