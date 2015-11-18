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

    findBestMatch(text) {
        const query = this._filter(text);
        console.log("Searching for video by text: " + query);

        return ytApi.then(api => {
            return api.search.list({
                q: query,
                part: 'snippet'
            }).then(response => {
                if (response.result.items.length > 0) {
                    return response.result.items[0];
                } else {
                    return Promise.reject('No videos found');
                }
            });
        });
    }

    findById(id) {
        console.log("Searching for video by id: " + id);
        return ytApi.then(api => {
            return api.video.list({
                id: id,
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

    _filter(text) {
        let s = text;

        [
            /#[^ ]+/g,
            /@[^ ]+/g,
            /-/g,
            /playing/gi,
            /https?:\/\/[^ ]+/g,
            /now playing/ig,
            /new video/ig,
            /^\w+:/ig,
            /[:;"]/ig
        ].forEach(r => s = s.replace(r, ''));


        return s.trim();
    }
}