class Notification < ActiveRecord::Base
  belongs_to :blog
  
  validates :blog_id, :email, presence: true
end
