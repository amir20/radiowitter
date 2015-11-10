import $ from 'jquery'
import Immutable from 'immutable'

export default class Twitter {
    constructor(handle) {
        this._mostRecent = null;
        this._tweets = Immutable.List.of();
        this._handle = handle;
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
                        let nextTweet = this._tweets.last();

                        if (nextTweet !== undefined) {
                            this._tweets = this._tweets.pop();
                            this._mostRecent = nextTweet;
                        }
                    
                        return nextTweet;
                    }
                );
        }
    }

    nextRandomTweet() {
        return Promise.resolve($.get("/twitter/search.json", {count: 25, screen_name: this._handle}))
            .then(tweets => tweets[Math.floor(Math.random() * tweets.length)]);

    }

    mostRecent() {
        return this._mostRecent;
    }

    queuedTweets() {
        return this._tweets;
    }

    _params() {
        return this._mostRecent == null ? {count: 1, screen_name: this._handle} : {
            since_id: this._mostRecent.id_str,
            screen_name: this._handle
        };
    }
}
