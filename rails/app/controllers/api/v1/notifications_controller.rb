include ActionController::ImplicitRender

module Api
  module V1
    class NotificationsController < ApplicationController
      respond_to :json

      def index
        @notifications = Notification.all
        
        respond_with @notifications
      end
      
      def show     
        @notification = Notification.find(params[:id])
        
        respond_with @notification
      end

      def create
        begin
          notification = Notification.create!(notification_params)
          
          # see here for why the :location is needed : http://stackoverflow.com/questions/7303551/rails-respond-with-acting-different-in-index-and-create-method
          # NoMethodError (undefined method `activity_url' for #<NotificationsController:0x007fe542b27120>): app/controllers/notifications_controller.rb:in `create'
          respond_with notification, :location => nil

        rescue Exception => e
          messages = ["Could not create notification"]
          if notification
            message = notification.errors.full_messages
          end
            
          render :json => { :errors => messages}, :status => 422
        end
      end
      
      def update
        @notification = Notification.update(params[:id], notification_params)
        
        respond_with @notification, :location => nil
      end
      
      def destroy
        respond_with Notification.delete(params[:id])
      end
      
      private
      
      def notification_params
        params.require(:notification).permit(:id, :blog_id, :email)
      end      
      
    end
  end
end