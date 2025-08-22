import { fetchAllFeeds } from '../../utils/fetchFeeds';

/**
 * API route that aggregates all feeds and returns a JSON object keyed by
 * country. Running the aggregation in an API route allows the client to
 * refresh content without a full page reload. We set Cache‑Control headers to
 * enable Next.js’ incremental static regeneration in production and to
 * ensure serverless deployments on Vercel or Netlify cache results for a
 * sensible amount of time.
 */
export default async function handler(req, res) {
  try {
    const data = await fetchAllFeeds();
    // Cache for 1 hour, serve stale data while revalidating for up to 30 minutes
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=1800');
    res.status(200).json(data);
  } catch (error) {
    console.error('Error in API route /api/news:', error);
    res.status(500).json({ error: 'Error fetching news feeds' });
  }
}
