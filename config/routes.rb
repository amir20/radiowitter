Rails.application.routes.draw do
  resources :tweets, only: [:index]
  resources :player, only: [:index]

  root 'player#index'
end
