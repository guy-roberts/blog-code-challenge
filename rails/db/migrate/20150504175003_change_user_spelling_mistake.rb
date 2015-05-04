class ChangeUserSpellingMistake < ActiveRecord::Migration
  def change
    rename_column :users, :authenication_token, :authentication_token
  end
end
