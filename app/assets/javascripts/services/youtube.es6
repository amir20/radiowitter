class Youtube {
    constructor() {
    }

    findFirstMatch(q) {
        return ytApi.then((api) => {
            return api.search.list({
                q: this._filter(q),
                part: 'snippet'
            }).then((response) => {
                if (response.result.items.length > 0) {
                    return response.result.items[0];
                } else {
                    return null;
                }
            });
        });
    }

    _filter(s) {
        [/#[^ ]+/g, /@[^ ]+/g, /-/g, /playing/g].forEach((r) => {
            s = s.replace(r, '');
        });
        return s;
    }
}