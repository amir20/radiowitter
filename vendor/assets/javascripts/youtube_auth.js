var youtubeApiDeferred = $.Deferred();
ytApi = Promise.resolve(youtubeApiDeferred.promise());

function googleApiClientReady() {
    gapi.client.load('youtube', 'v3').then(function () {
        gapi.client.setApiKey("AIzaSyCttnVaAV0fG1llha187HvtcZd9mUlcxAQ");
        youtubeApiDeferred.resolve(gapi.client.youtube);
    });
}

