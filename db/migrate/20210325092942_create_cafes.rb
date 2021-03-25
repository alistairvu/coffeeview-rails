class CreateCafes < ActiveRecord::Migration[6.1]
  def change
    create_table :cafes do |t|
      t.string :name
      t.string :address
      t.string :district
      t.text :description
      t.string :price
      t.string :hours
      t.string :slug

      t.timestamps
    end
  end
end
