include ActionController::ImplicitRender

module Api
  module V1
    class SubscriptionsController < ApplicationController
      respond_to :json

      def index
        @subscriptions = Subscription.all
        
        respond_with @subscriptions
      end
      
      def show     
        @subscription = Subscription.find(params[:id])
        
        respond_with @subscription
      end

      def create
        begin
          subscription = Subscription.create!(subscription_params)
          
          # see here for why the :location is needed : http://stackoverflow.com/questions/7303551/rails-respond-with-acting-different-in-index-and-create-method
          # NoMethodError (undefined method `activity_url' for #<SubscriptionsController:0x007fe542b27120>): app/controllers/subscriptions_controller.rb:in `create'
          respond_with subscription, :location => nil

        rescue Exception => e
          messages = ["Could not create subscription"]
          if subscription
            message = subscription.errors.full_messages
          end
            
          render :json => { :errors => messages}, :status => 422
        end
      end
      
      def update
        @subscription = Subscription.update(params[:id], subscription_params)
        
        respond_with @subscription, :location => nil
      end
      
      def destroy
        respond_with Subscription.delete(params[:id])
      end
      
      private
      
      def subscription_params
        params.require(:subscription).permit(:id, :blog_id, :email)
      end      
      
    end
  end
end