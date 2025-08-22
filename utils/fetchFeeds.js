/*
 * Utility functions for fetching and normalising RSS/Atom feeds.
 *
 * We use the `rss-parser` package to parse feed data. Each feed is
 * defined in `config/feeds.js`. When this module is called on the
 * server (either in getServerSideProps or an API route), it will fetch
 * all configured feeds, extract a common set of fields and organise
 * articles by country. Images are extracted from the enclosure field
 * when available or by inspecting the HTML content. If no image is
 * present, the NewsCard component will gracefully omit the image.
 */

const Parser = require('rss-parser');
const feeds = require('../config/feeds');

// Create a single parser instance. Reusing the parser improves
// performance when fetching multiple feeds.
const parser = new Parser({
  timeout: 10000, // 10 seconds timeout per feed
});

/**
 * Extracts the first image URL from an HTML string. Many RSS feeds embed
 * the article’s featured image inside the `content` or `content:encoded`
 * fields. This helper uses a regular expression to pull out the first
 * `<img>` tag’s `src` attribute. If no image is found, it returns null.
 *
 * @param {string} html - An HTML snippet from a feed item
 * @returns {string|null} The extracted image URL or null
 */
function extractImage(html) {
  if (!html) return null;
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/i;
  const match = imgRegex.exec(html);
  return match ? match[1] : null;
}

/**
 * Fetches and parses all configured feeds.
 *
 * The returned object maps country names to arrays of article objects.
 * Each article includes the title, link, publication date, a snippet
 * (if available), the source name, and a best‑effort image URL.
 *
 * If a feed fails to load or parse, the error is caught and logged
 * without halting the entire aggregation. This ensures one failing
 * source doesn’t disrupt the whole site.
 *
 * @returns {Promise<Record<string, Array>>}
 */
async function fetchAllFeeds() {
  const results = {};
  for (const feed of feeds) {
    try {
      const data = await parser.parseURL(feed.url);
      const items = data.items || [];
      // Ensure we have an array to push into
      if (!results[feed.country]) {
        results[feed.country] = [];
      }
      items.forEach((item) => {
        // Derive the image: prefer enclosure.url, fallback to extracting from HTML
        const enclosureImage = item.enclosure && item.enclosure.url ? item.enclosure.url : null;
        const contentImage = extractImage(item['content:encoded'] || item.content || '');
        const image = enclosureImage || contentImage;
        results[feed.country].push({
          title: item.title || '',
          link: item.link || item.guid || '#',
          pubDate: item.isoDate || item.pubDate || null,
          snippet: item.contentSnippet || item.summary || '',
          source: feed.name,
          image,
        });
      });
    } catch (error) {
      // Log error on the server for debugging; skip the feed gracefully
      console.error(`Error fetching or parsing feed '${feed.name}' (${feed.url}):`, error.message);
    }
  }
  // Sort articles by publication date descending within each country
  Object.keys(results).forEach((country) => {
    results[country].sort((a, b) => {
      const dateA = a.pubDate ? new Date(a.pubDate).getTime() : 0;
      const dateB = b.pubDate ? new Date(b.pubDate).getTime() : 0;
      return dateB - dateA;
    });
  });
  return results;
}

module.exports = { fetchAllFeeds };
