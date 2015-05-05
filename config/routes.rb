Rails.application.routes.draw do
  get 'articles/index'

  # Tell the router to use the user/sessions controller
  devise_for :users,
    :controllers => {
      sessions: "users/sessions"
    }
    
  devise_scope:user do
    post '/check/is_user' => 'users/users#is_user',
      as: 'is_user'
    post '/api/v1/current_user' => 'api/v1/sessions#get_current_user' 
  end
  
  namespace :api do  
    namespace :v1 do    
      devise_for :users          
      
      resources :articles
      resources :blogs do  
        resources :subscriptions  
        resources :articles do 
          resources :comments
        end
      end
      resources :notifications
    end
  end
      
  root to: "home#index"
  
end
