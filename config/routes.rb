Rails.application.routes.draw do
  get 'twitter/search', to: 'twitter#search'

  get 'youtube/search', to: 'youtube#search'
  resources :youtube, only: [:show]

  get 'scraper/', to: 'scraper#index'

  resources :player, only: [:index]

  root 'player#index'
end
