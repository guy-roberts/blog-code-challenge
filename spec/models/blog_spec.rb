require 'rails_helper'

RSpec.describe Blog, :type => :model do
  it "has a valid factory" do
    expect(FactoryGirl.create(:blog)).to be_valid
  end
  it "is invalid without a title" do
    expect(FactoryGirl.build(:blog, title: nil)).not_to be_valid
  end
end
