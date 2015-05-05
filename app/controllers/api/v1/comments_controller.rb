include ActionController::ImplicitRender

module Api
  module V1
    class CommentsController < ApplicationController
      respond_to :json

      def index
        
        if (params['article_id'])
          @comments = Comment.where('article_id = ?', params['article_id'])
        else
          @comments = Comment.all
        end
        
        respond_with @comments
      end
      
      def show     
        @comment = Comment.find(params[:id])
        
        respond_with @comment
      end

      def create
      
        begin
          comment = Comment.create!(comment_params)
          
          # see here for why the :location is needed : http://stackoverflow.com/questions/7303551/rails-respond-with-acting-different-in-index-and-create-method
          # NoMethodError (undefined method `activity_url' for #<CommentsController:0x007fe542b27120>): app/controllers/comments_controller.rb:in `create'
          respond_with comment, :location => nil

        rescue Exception => e
          messages = ["Could not create comment"]
          if comment
            message = comment.errors.full_messages
          end
            
          render :json => { :errors => messages}, :status => 422
        end
      end
      
      def update
        @comment = Comment.update(params[:id], comment_params)
        
        respond_with @comment, :location => nil
      end
      
      def destroy
        respond_with Comment.delete(params[:id])
      end
      
      private
      
      def comment_params
        params.require(:comment).permit(:id, :body, :ip, :email, :blog_id, :article_id)
      end      
      
    end
  end
end