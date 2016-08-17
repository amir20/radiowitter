export default class Scraper {
    constructor() {
    }

    lookForMedia(url) {
        return fetch(`/scraper.json?url=${url}`).then(r => r.json())
    }
}
