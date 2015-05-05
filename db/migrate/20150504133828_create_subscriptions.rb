class CreateSubscriptions < ActiveRecord::Migration
  def change
    create_table :subscriptions do |t|
      t.text :email
      t.integer :blog_id

      t.timestamps null: false
    end
  end
end
