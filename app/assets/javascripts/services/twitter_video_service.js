import co from "co";
import findBestMatchVideo from "./youtube";
import scrapeForMedia from "./scraper";


export const findNextBestVideo = co.wrap(function *(twitterService) {
    let video = null;
    let tweet = yield twitterService.nextTweet();

    try {
        video = yield videoService(tweet);
    } catch (e) {
        // do nothing and let fall in to next if statement
        console.error(e);
    }

    if (!video) {
        for (let attempt = 0; video === null && attempt < 6; attempt++) {
            tweet = yield twitterService.nextRandomTweet()
            try {
                video = yield videoService(tweet);
            } catch (e) {
                console.error(e);
            }
        }
    }

    video.tweet = tweet;

    return video;
});

const videoService = co.wrap(function *(tweet) {
    if (!tweet) {
        throw 'tweet is null'
    }

    let video = null;

    if (tweet.entities && tweet.entities.urls.length > 0) {
        let url = tweet.entities.urls[0].expanded_url;

        try {
            let doc = yield scrapeForMedia(url);

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
            video = yield findBestMatchVideo(tweet.text);
        } catch (e) {
            yield Promise.reject(`No match found for tweet. [${e}]`);
        }
    }

    return video;
});


