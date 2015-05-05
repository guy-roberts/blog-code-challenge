include ActionController::ImplicitRender

module Api
  module V1
    class BlogsController < ApplicationController
      respond_to :json

      def index
        @blogs = Blog.all
        
        respond_with @blogs
      end
      
      def show     
        @blog = Blog.find(params[:id])
        
        respond_with @blog
      end

      def create
        begin
          blog = Blog.create!(blog_params)
          
          # see here for why the :location is needed : http://stackoverflow.com/questions/7303551/rails-respond-with-acting-different-in-index-and-create-method
          # NoMethodError (undefined method `activity_url' for #<BlogsController:0x007fe542b27120>): app/controllers/blogs_controller.rb:in `create'
          respond_with blog, :location => nil

        rescue Exception => e
          messages = ["Could not create blog"]
          if blog
            message = blog.errors.full_messages
          end
            
          render :json => { :errors => messages}, :status => 422
        end
      end
      
      def update
        @blog = Blog.update(params[:id], blog_params)
        
        respond_with @blog, :location => nil
      end
      
      def destroy
        respond_with Blog.delete(params[:id])
      end
      
      private
      
      def blog_params
        params.require(:blog).permit(:id, :title, :body, :blog_id)
      end      
      
    end
  end
end