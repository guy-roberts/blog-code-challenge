require 'rails_helper'

RSpec.describe Api::V1::ArticlesController, :type => :controller do

  describe "GET #index" do
    
    it "returns http success" do
      get :index,  {:format => :json }
      expect(response).to be_success
    end
    
    it "populates an array of articles" do
      article = FactoryGirl.create(:article)
      get :index,  :format => :json 
      
      expect([assigns(:articles).last]).to eq([article])
    end
    
  end
  
  describe "GET #show" do
    it "assigns the requested article to @article" do
       article = FactoryGirl.create(:article)
       get :show, id: article,  :format => :json 
       expect(assigns(:article)).to be == article
     end
  end
  
  describe "POST #create" do
    context "with valid attributes" do
      it "creates a new article" do
        expect{
          post :create, article: FactoryGirl.attributes_for(:article)
        }.to change(Article,:count).by(1)
      end
    end
    
    context "with invalid attributes" do
      it "does not save the new article" do
        expect{
          post :create, article: FactoryGirl.attributes_for(:invalid_article)
        }.to_not change(Article,:count)
      end
    end
  end
  
  describe 'DELETE destroy' do
    before :each do
      @article = FactoryGirl.create(:article)
    end

    it "deletes the article" do
      expect{
        delete :destroy, id: @article, :format => :json     
      }.to change(Article,:count).by(-1)
    end

  end
  
  describe 'PUT update' do
    before :each do
      @article = FactoryGirl.create(:article, {title: "Some Title", body: "A story"})
    end

    context "valid attributes" do
      it "located the requested @article" do        
        put :update, id: @article, article: FactoryGirl.attributes_for(:article), :format => :json 
        expect(assigns(:article)).to eq(@article)      
      end
      
      it "changes @article's attributes" do
        put :update, id: @article, :format => :json,
          article: FactoryGirl.attributes_for(:article, {title: "Changed Title", body: "A story"})
        @article.reload
        expect(@article.title).to eq("Changed Title")
        expect(@article.body).to eq("A story")
      end
    end

    context "invalid attributes" do
      it "located the requested @article" do        
        put :update, id: @article, article: FactoryGirl.attributes_for(:invalid_article), :format => :json 
        expect(assigns(:article)).to eq(@article)      
      end
      
      it "does not change @article's attributes" do
        put :update, id: @article, :format => :json,
          article: FactoryGirl.attributes_for(:article, {title: "Changed Title", body: nil})
        @article.reload
        expect(@article.title).not_to eq("Changed Title")
        expect(@article.body).to eq("A story")
      end

    end
  end

end
