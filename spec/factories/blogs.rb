FactoryGirl.define do
  factory :blog do
    title "One liners"
  end
  
  factory :invalid_blog, parent: :blog do |f|
    f.title nil
  end
end
