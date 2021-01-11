class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.string :name
      t.integer :price
      t.boolean :owned
      t.integer :hobby_id

      t.timestamps
    end
  end
end
