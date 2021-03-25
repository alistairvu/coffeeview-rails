class AddImagesToCafe < ActiveRecord::Migration[6.1]
  def change
    add_column :cafes, :images, :string, array: true, default: []
  end
end
