class YoutubeController < ApplicationController

  def show
    @video = Yt::Video.new(params)
  end

  def search
    @videos = Yt::Collections::Videos.new.where(search_params).first(1)
  end

  def search_params
    params.permit(:q, :id)
  end
end
