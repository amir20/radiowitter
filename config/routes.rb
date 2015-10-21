Rails.application.routes.draw do
  get 'twitter/search', to: 'twitter#search'
  resources :player, only: [:index]

  root 'player#index'
end
