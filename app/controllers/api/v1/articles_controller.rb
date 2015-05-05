include ActionController::ImplicitRender

module Api
  module V1
    class ArticlesController < ApplicationController
      respond_to :json

      def index
        @articles = Article.all
        
        respond_with @articles
      end
      
      def show     
        @article = Article.find(params[:id])
        
        respond_with @article
      end

      def create
        begin
          article = Article.create!(article_params)
          
          # see here for why the :location is needed : http://stackoverflow.com/questions/7303551/rails-respond-with-acting-different-in-index-and-create-method
          # NoMethodError (undefined method `activity_url' for #<ArticlesController:0x007fe542b27120>): app/controllers/articles_controller.rb:in `create'
          respond_with article, :location => nil

        rescue Exception => e
          messages = ["Could not create article"]
          if article
            message = article.errors.full_messages
          end
            
          render :json => { :errors => messages}, :status => 422
        end
      end
      
      def update
        @article = Article.update(params[:id], article_params)
        
        respond_with @article, :location => nil
      end
      
      def destroy
        respond_with Article.delete(params[:id])
      end
      
      private
      
      def article_params
        params.require(:article).permit(:id, :title, :body, :blog_id)
      end      
      
    end
  end
end