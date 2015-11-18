Rails.application.routes.draw do
  get 'twitter/search', to: 'twitter#search'
  get 'scraper/', to: 'scraper#index'

  resources :player, only: [:index]

  root 'player#index'
end
