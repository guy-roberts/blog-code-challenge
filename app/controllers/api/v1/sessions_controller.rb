module Api
  module V1
    class SessionsController < Devise::SessionsController

      skip_before_filter :verify_authenticity_token

      before_filter :authenticate_user!, except: [:create]
      respond_to :json
  
      def create
        resource = User.find_for_database_authentication(email: params[:user][:email])
        
        if (resource && resource.valid_password?(params[:user][:password]) )
          # Change the authentication_token
          resource.authentication_token = Devise.friendly_token
          resource.save!
        
          render status: 200,
            json: {
              success: true,
              info: "Logged in",
              data: {
                'X-User-Email' => resource.email,
                'X-User-Token' => resource.authentication_token
              }
            }  
        else
          failure
        end
        
      end

      def destroy
        # Use a different auth token for each session
        current_user.update_column(:authentication_token, nil)
        
        # This is copied from the Devise session_controller        
        signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
        set_flash_message :notice, :signed_out if signed_out && is_flashing_format?
        
        render status: 200,
          json: {
            success: true,
            info: "Logged out",
            data: {}
          }
      end

      def get_current_user      
        if user_signed_in?
          render status: 200,
            json: {
              success: true,
              info: "Current user",
              data: {
                token: current_user.authentication_token,
                email: current_user.email
              }
            }
        else          
          render status: 401,
            json: {
              success: false,
              info: "",
              data: {}
            }
        end
      end

      def failure
        warden.custom_failure!
        render status: 401,
          json: {
            success: false,
            info: "Login failed",
            data: {}
          }
      end
    end
  end
end
