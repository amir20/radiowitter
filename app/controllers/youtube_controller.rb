class YoutubeController < ApplicationController

  def show
    @video = Yt::Video.new(params)
  end

  def search
    ids = Yt::Collections::Videos.new
              .where(search_params.merge(part: 'snippet'))
              .first((search_params[:max_results] || 10).to_i).map(&:id)

    @videos = Yt::Collections::Videos.new.where(id: ids.join(','), part: 'snippet,contentDetails,status,statistics')
  end

  def search_params
    params.permit(:q, :id, :order, :max_results, :video_duration, :video_syndicated).to_h
  end
end
