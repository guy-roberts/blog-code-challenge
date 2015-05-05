class Blog < ActiveRecord::Base
  has_many :articles
  has_many :users
  has_many :subscriptions
  
  validates :title, presence: true
end
