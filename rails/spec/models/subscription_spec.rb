require 'rails_helper'

RSpec.describe Subscription, :type => :model do
  it "has a valid factory" do
    expect(FactoryGirl.create(:subscription)).to be_valid
  end
  it "is invalid without an email" do
    expect(FactoryGirl.build(:subscription, email: nil)).not_to be_valid
  end
end
