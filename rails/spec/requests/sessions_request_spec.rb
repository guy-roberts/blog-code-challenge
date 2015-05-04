include Devise::TestHelpers

describe Api::V1::SessionsController do

  describe "POST #create" do

   before do
     existing_user = User.first
     if existing_user
       User.delete existing_user
     end
     @user = FactoryGirl.create :user
   end

    context "when the credentials are correct" do

      before(:each) do
        credentials = { email: @user.email, password: "12345678" }
        post "/api/v1/users/sign_in", { user: credentials }
      end

      it "returns the user record corresponding to the given credentials" do
        @user.reload

        js = JSON.parse(response.body)      
        expect(js["data"]["X-User-Token"]).to eql @user.authentication_token
        expect(response.status == 200)
      end

    end

    context "when the credentials are incorrect" do

      before(:each) do
        credentials = { email: @user.email, password: "invalidpassword" }
        post "/api/v1/users/sign_in", { user: credentials }
      end

      it "returns a json with an error" do
        js = JSON.parse(response.body)      
        
        expect(js['info'] == 'Login failed')
        expect(response.status == 401)
      end

    end
  end

end