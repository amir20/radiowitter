export default function scrapeForMedia(url) {
    return fetch(`/scraper.json?url=${url}`).then(r => r.json())
}