class TweetsController < ApplicationController
  TWITTER_CLIENT = Twitter::REST::Client.new do |config|
    config.consumer_key        = ENV['twitter_consumer_key']
    config.consumer_secret     = ENV['twitter_consumer_secret']
  end

  def search
    render json: TWITTER_CLIENT.user_timeline('bpm_playlist')
  end
end
