var youtubeApiDeferred = $.Deferred();
ytApi = Promise.resolve(youtubeApiDeferred.promise());

function googleApiClientReady() {
    gapi.client.load('youtube', 'v3').then(function () {
        gapi.client.setApiKey("AIzaSyBG6og9E2xaFIqNlxP3yw-d0t7JOgtGpyo");
        youtubeApiDeferred.resolve(gapi.client.youtube);
    });
}

