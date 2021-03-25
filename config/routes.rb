Rails.application.routes.draw do
  scope "/api" do
    namespace :auth do
      resources :sessions, only: [:create]
      resources :registrations, only: [:create]
      delete :logout, to: "sessions#logout"
      get :logged_in, to: "sessions#logged_in"
    end

    resources :users, only: [:show, :update, :destroy]
  end
end
