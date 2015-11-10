import $ from 'jquery'

let ytApi = null;

// Do this weird hackery when compiling on server
if ($.Deferred) {
    let youtubeApiDeferred = $.Deferred();
    ytApi = Promise.resolve(youtubeApiDeferred.promise());

    function googleApiClientReady() {
        gapi.client.load('youtube', 'v3').then(() => {
            gapi.client.setApiKey("AIzaSyBG6og9E2xaFIqNlxP3yw-d0t7JOgtGpyo");
            youtubeApiDeferred.resolve(gapi.client.youtube);
        });
    }

    window.googleApiClientReady = googleApiClientReady;
}


export default class Youtube {
    constructor() {
    }

    findFirstMatch(tweet) {
        return ytApi.then(api => {
            return api.search.list({
                q: this._filter(tweet),
                part: 'snippet'
            }).then(response => {
                if (response.result.items.length > 0) {
                    return response.result.items[0];
                } else {
                    return null;
                }
            });
        });
    }

    _filter(tweet) {
        let s = tweet.text;

        [
            /#[^ ]+/g,
            /@[^ ]+/g,
            /-/g,
            /playing/gi,
            /https?:\/\/[^ ]+/g,
            /now playing/ig,
            /new video/ig,
            new RegExp(tweet.user.screen_name, 'ig'),
            /[:;"]/ig
        ].forEach(r => s = s.replace(r, ''));


        return s.trim();
    }
}