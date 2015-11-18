require 'open-uri'

class HtmlDocument
  YOUTUBE_REGEX = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i

  attr_reader :url
  attr_reader :title
  attr_reader :media

  def initialize(url, title, media)
    @url = url
    @title = title
    @media = media
  end


  def self.scrape_page(url)
    raise 'url is null' unless url
    connection = open(url)
    page = Nokogiri::HTML(connection)
    media = {}

    scrape_youtube(connection, page, media)

    new(connection.base_uri.to_s, page.at('title').text, media)
  end


  private
  def self.scrape_youtube(connection, page, media)
    match = YOUTUBE_REGEX.match(connection.base_uri.to_s)

    # Look for youtube id in the page url
    media[:youtube] =  match[1] if match

    # Look for all iframes
    iframe = page.css('iframe').find { |iframe| YOUTUBE_REGEX.match(iframe['src']) }
    media[:youtube] = YOUTUBE_REGEX.match(iframe['src'])[1] if iframe
  end
end