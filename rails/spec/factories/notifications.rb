FactoryGirl.define do
  factory :notification do
    association :blog, :factory => :blog
    email "sue@home.com"
  end
  
  factory :invalid_notification, parent: :notification do |f|
    f.email nil
  end
end