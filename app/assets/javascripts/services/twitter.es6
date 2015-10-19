class Twitter {
    constructor() {
        this.quque = Immutable.List();
    }

    nextTweet() {
        if (this.quque.isEmpty()) {
            return Promise.resolve($.get("/twitter/search.json"))
                .then(tweets => {
                    this.quque = Immutable.List(tweets);
                    return this.quque.first();
                });
        } else {
            var first = this.quque.first();
            this.quque = this.quque.pop();
            return Promise.resolve(first);
        }
    }

}
