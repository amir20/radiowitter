import $ from 'jquery'
import co from 'co'
import Youtube from './youtube'
import Scraper from './scraper'

const youtube = new Youtube();
const scraper = new Scraper();

export default co.wrap(function *(tweet) {
    if (!tweet) {
        throw 'tweet is null'
    }

    let video = null;

    if (tweet.entities && tweet.entities.urls.length > 0) {
        let url = tweet.entities.urls[0].expanded_url;

        try {
            let doc = yield scraper.lookForMedia(url);

            if (doc.media && doc.media.youtube) {
                video = doc.media.youtube;
                console.log(`Found video on [${url}].`);
            }
        } catch (e) {
            console.error(e);
        }
    }

    if (video === null) {
        try {
            video = yield youtube.findBestMatch(tweet.text);
        } catch (e) {
            yield Promise.reject(`No match found for tweet. [${e}]`);
        }
    }

    return video;
});
