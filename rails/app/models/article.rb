class Article < ActiveRecord::Base
  belongs_to :blog
  has_many :comments
  
  validates :blog_id, :title, :body, presence: true
end
