FactoryGirl.define do
  factory :subscription do
    association :blog, :factory => :blog
    email "jake@home.com"
  end
  
  factory :invalid_subscription, parent: :subscription do |f|
    f.email nil
  end
end
