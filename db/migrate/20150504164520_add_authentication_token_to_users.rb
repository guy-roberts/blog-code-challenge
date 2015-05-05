class AddAuthenticationTokenToUsers < ActiveRecord::Migration
  def change
    add_column :users, :authenication_token, :string
  end
end
