class AddIsShownToCafe < ActiveRecord::Migration[6.1]
  def change
    add_column :cafes, :is_shown, :boolean, default: false
  end
end
