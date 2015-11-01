import $ from 'jquery'
import Immutable from 'immutable';

export default class Twitter {
    constructor() {
        this._mostRecent = null;
        this._tweets = Immutable.List.of();
    }

    nextTweet() {
        if (!this._tweets.isEmpty()) {
            this._mostRecent = this._tweets.last();
            this._tweets = this._tweets.pop();
            return Promise.resolve(this._mostRecent);
        } else {
            return Promise.resolve($.get("/twitter/search.json", this._params()))
                .then(tweets => {
                    this._tweets = Immutable.List(tweets);
                    this._mostRecent = this._tweets.last();
                    this._tweets = this._tweets.pop();
                    return this._mostRecent;
                }
            );
        }
    }

    queuedTweets() {
        return this._tweets;
    }

    _params() {
        return this._mostRecent == null ? {count: 1, screen_name: 'bpm_playlist'} : {
            since_id: this._mostRecent.id_str,
            screen_name: 'bpm_playlist'
        };
    }
}
