import React from 'react';

/**
 * Displays a single news article as a card. Each card includes an
 * image (if available), the article’s title (linked to the original
 * source), a short snippet and the publication date. Using flex
 * utilities ensures the card gracefully fills the available height.
 *
 * @param {{ item: { title: string, link: string, snippet: string, pubDate: string, source: string, image?: string } }} props
 */
export default function NewsCard({ item }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col">
      {item.image ? (
        // Use the extracted image to create visual impact. If the image fails
        // to load for any reason the browser will ignore the missing resource.
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-48 object-cover"
        />
      ) : null}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-lg mb-2 text-gray-900">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {item.title}
          </a>
        </h3>
        {item.snippet && (
          <p className="text-sm text-gray-600 mb-2 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
            {item.snippet}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
          <span>
            {item.pubDate
              ? new Date(item.pubDate).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
              : ''}
          </span>
          {item.source && <span className="italic">{item.source}</span>}
        </div>
      </div>
    </div>
  );
}
