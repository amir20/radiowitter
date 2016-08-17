import Immutable from "immutable";

export default class Twitter {
    constructor(handle) {
        this._mostRecent = null;
        this._tweets = Immutable.List.of();
        this._handle = handle;
        this._randomQueue = Immutable.List.of();
    }

    nextTweet() {
        if (!this._tweets.isEmpty()) {
            this._mostRecent = this._tweets.last();
            this._tweets = this._tweets.pop();
            return Promise.resolve(this._mostRecent);
        } else {
            return fetch("/twitter/search.json?" + this._params())
                .then(r => r.json())
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
        if (!this._randomQueue.isEmpty()) {
            let nextTweet = this._randomQueue.last();
            this._randomQueue = this._randomQueue.pop();
            return Promise.resolve(nextTweet);
        } else {
            return fetch(`/twitter/search.json?count=50&screen_name=${this._handle}`)
                .then(r => r.json())
                .then(tweets => {
                    this._randomQueue = Immutable.List(Twitter.shuffleArray(tweets));
                    return this.nextRandomTweet();
                });
        }
    }

    mostRecent() {
        return this._mostRecent;
    }

    queuedTweets() {
        return this._tweets;
    }

    _params() {
        return this._mostRecent == null
            ? `count=1&screen_name=${this._handle}`
            : `since_id=${this._mostRecent.id_str}&screen_name=${this._handle}`;
    }

    static shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
}
