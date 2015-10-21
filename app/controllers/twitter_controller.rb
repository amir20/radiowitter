class TwitterController < ApplicationController
  TWITTER_CLIENT = Twitter::REST::Client.new do |config|
    config.consumer_key        = ENV['twitter_consumer_key']
    config.consumer_secret     = ENV['twitter_consumer_secret']
  end

  def search
    render json: TWITTER_CLIENT.user_timeline('bpm_playlist', search_params)
  end

  def search_params
    params.permit(:count, :max_id, :since_id, :user_id, :screen_name)
  end
end
