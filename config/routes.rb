Rails.application.routes.draw do
  get 'twitter/search', to: 'tweets#search'
  resources :player, only: [:index]

  root 'player#index'
end
