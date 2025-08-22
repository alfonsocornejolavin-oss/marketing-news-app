import React, { useState } from 'react';
import useSWR from 'swr';
import CountryTabs from '../components/CountryTabs';
import NewsCard from '../components/NewsCard';
import { fetchAllFeeds } from '../utils/fetchFeeds';

/**
 * Fetcher function for SWR. It uses the native fetch API to request
 * JSON data from the given URL and parses the response. If the
 * response isn’t OK the promise rejects to signal an error state.
 *
 * @param {...any} args - arguments passed by SWR (URL, options)
 */
const fetcher = async (...args) => {
  const res = await fetch(...args);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

/**
 * Home page component. Displays a search bar, a set of country tabs and a grid
 * of news cards. Data is fetched server‑side for the initial render and kept
 * fresh on the client using SWR with a refresh interval. This allows the
 * interface to update automatically as new articles are published.
 *
 * @param {{ initialData: Record<string, Array> }} props
 */
export default function Home({ initialData }) {
  // Use SWR to revalidate data on the client every hour. The fallbackData
  // property ensures the page renders immediately with the server‑fetched
  // content before any client fetch occurs.
  const { data } = useSWR('/api/news', fetcher, {
    fallbackData: initialData,
    refreshInterval: 60 * 60 * 1000, // 1 hour refresh interval
  });

  const countries = data ? Object.keys(data) : [];
  // Select the first country by default
  const [selectedCountry, setSelectedCountry] = useState(
    countries.length > 0 ? countries[0] : ''
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Filter articles based on the search query
  const filteredNews = data && selectedCountry
    ? (data[selectedCountry] || []).filter((item) =>
        (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.snippet && item.snippet.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow py-4 mb-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Noticias de Marketing y Publicidad del Mundo
          </h1>
          <p className="text-gray-600">Actualizaciones en tiempo real de portales especializados</p>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 flex-1">
        {/* Search bar */}
        <div className="mb-4 max-w-md">
          <input
            type="text"
            placeholder="Buscar por palabra clave..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Country tabs */}
        {countries.length > 0 && (
          <CountryTabs
            countries={countries}
            selectedCountry={selectedCountry}
            onSelect={(country) => setSelectedCountry(country)}
          />
        )}
        {/* News grid */}
        <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredNews.map((item, index) => (
            <NewsCard key={index} item={item} />
          ))}
          {filteredNews.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              No se encontraron artículos que coincidan con la búsqueda.
            </p>
          )}
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-gray-500">
        Última actualización automática cada hora.
      </footer>
    </div>
  );
}

/**
 * getServerSideProps runs on every request when a user visits the home page.
 * It fetches the latest data from all configured feeds on the server and
 * passes it into the page as `initialData`. This ensures SEO bots and
 * non‑JavaScript clients get fresh content, while the client side uses
 * SWR to keep the data up to date without full page reloads.
 */
export async function getServerSideProps() {
  const initialData = await fetchAllFeeds();
  return {
    props: { initialData },
  };
}
