Rails.application.routes.draw do
  scope "/api" do
    namespace :auth do
      post :login, to: "sessions#create"
      post :signup, to: "registrations#create"
      delete :logout, to: "sessions#logout"
      get :logged_in, to: "sessions#logged_in"
    end

    resources :users, only: [:show, :update, :destroy]
    get "/cafes/search", to: "cafes#search"
    resources :cafes, only: [:create, :show, :update, :destroy, :index, :reviews]
    get "/reviews/cafe/:id", to: "reviews#cafe"
    resources :reviews, only: [:create, :destroy]
    post "images", to: "images#create"
  end

  match "*all", to: "static_pages#index", via: [:get], constraints: lambda { |req| req.path !~ /\.(png|jpg|js|css)$/ }
end
