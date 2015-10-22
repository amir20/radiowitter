var youtubeApiDeferred = $.Deferred();
ytApi = Promise.resolve(youtubeApiDeferred.promise());

function googleApiClientReady() {
    gapi.client.load('youtube', 'v3').then(function () {
        gapi.client.setApiKey("AIzaSyC1yqoz38j5k8YROKpimUACmgR2yx6XPWA");
        youtubeApiDeferred.resolve(gapi.client.youtube);
    });
}

