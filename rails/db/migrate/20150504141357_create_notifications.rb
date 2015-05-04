class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.string :email
      t.integer :blog_id

      t.timestamps null: false
    end
  end
end
