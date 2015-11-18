class ScraperController < ApplicationController

  def index
    @document = HtmlDocument.scrape_page(index_params[:url])
  end

  def index_params
    params.permit(:url)
  end
end
