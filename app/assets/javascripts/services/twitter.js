export default class Twitter {
    constructor(handle) {
        this._mostRecent = null;
        this._tweets = [];
        this._handle = handle;
        this._randomQueue = [];
    }

    nextTweet() {
        if (this._tweets.length !== 0) {
            this._mostRecent = this._tweets.shift();
            return Promise.resolve(this._mostRecent);
        } else {
            return fetch("/twitter/search.json?" + this._params())
                .then(r => r.json())
                .then(tweets => {
                        this._tweets = tweets;
                        let nextTweet = this._tweets.shift();

                        if (nextTweet !== undefined) {
                            this._mostRecent = nextTweet;
                        }

                        return nextTweet;
                    }
                );
        }
    }

    nextRandomTweet() {
        if (this._randomQueue.length !== 0) {
            let nextTweet = this._randomQueue.shift();
            return Promise.resolve(nextTweet);
        } else {
            return fetch(`/twitter/search.json?count=50&screen_name=${this._handle}`)
                .then(r => r.json())
                .then(tweets => {
                    this._randomQueue = Twitter.shuffleArray(tweets);
                    return this.nextRandomTweet();
                });
        }
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
