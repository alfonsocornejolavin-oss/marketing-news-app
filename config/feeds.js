/*
 * Configuration of news sources for the aggregator.
 *
 * Each entry in this array defines a news feed and the country it
 * represents. The `url` should point to a valid RSS/Atom feed. The
 * `country` is used to group articles into separate tabs or sections in
 * the UI. Feel free to add or remove feeds as needed. If a feed stops
 * working you can disable it temporarily by commenting it out.
 */
const feeds = [
  {
    name: 'Adweek',
    country: 'Estados Unidos',
    url: 'https://www.adweek.com/feed/',
  },
  {
    name: 'Marketing Week',
    country: 'Reino Unido',
    url: 'http://www.marketingweek.co.uk/include/qbe/rss_latest_news.xml',
  },
  {
    name: 'Marketing Tech News',
    country: 'Reino Unido',
    url: 'https://marketingtechnews.net/feed/',
  },
  {
    name: 'Social Media Today',
    country: 'Estados Unidos',
    url: 'https://www.socialmediatoday.com/feed',
  },
  // Ejemplo de cómo agregar un portal de Latinoamérica:
  // {
  //   name: 'Adlatina',
  //   country: 'Argentina',
  //   url: 'https://newsloth.com/feeds/adlatina/latest',
  // },
];

module.exports = feeds;
