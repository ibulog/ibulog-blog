export default function sortArticleByDate(a, b) {
    return new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf()
}