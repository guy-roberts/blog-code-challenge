FactoryGirl.define do
  factory :comment do
    association :article, :factory => :article
    body "Comment body"
    ip   "192.168.0.1"
    email "jake@home.com"
  end
  
  factory :invalid_comment, parent: :comment do |f|
    f.title nil
  end
end
