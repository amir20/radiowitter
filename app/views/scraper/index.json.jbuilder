json.(@document, :url, :title)

json.media do
  json.youtube do
    json.partial! 'youtube/video', video: @document.media[:youtube]
  end if @document.media[:youtube]
end