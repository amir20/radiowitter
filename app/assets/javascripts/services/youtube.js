import $ from 'jquery'

export default class Youtube {
    constructor() {
    }

    findBestMatch(text) {
        const query = this._filter(text);

        if (query.length < 5) {
            return Promise.reject(`[${query}] is too short to search.`);
        }

        console.log(`Searching for video by text: [${query}].`);

        return Promise.resolve($.get("/youtube/search.json", {
                q: query,             
                video_syndicated: true,
                max_results: 5
            }))
            .then(videos => {
                    let video = videos.find(v => v.duration > 180 && v.duration < 540);
                    return video || Promise.reject('No videos found');
                }
            );
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
            /rt /ig,
            /\bon\b/ig,
            /\d?\d:\d\d([ap]m)?/ig, // 11:23
            /^.+?:/ig, // Example: ...
            /[:;"]/ig
        ].forEach(r => s = s.replace(r, ''));


        return s.trim();
    }
}