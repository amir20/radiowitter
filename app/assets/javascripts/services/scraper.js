import $ from 'jquery'
import Immutable from 'immutable'

export default class Scraper {
    constructor() {
    }

    lookForMedia(url) {
        return Promise.resolve($.get("/scraper.json", {url: url}));
    }
}
