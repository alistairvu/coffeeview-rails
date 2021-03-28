class AddIndexToCafesSlug < ActiveRecord::Migration[6.1]
  def change
    add_index :cafes, :slug, unique: true
  end
end
