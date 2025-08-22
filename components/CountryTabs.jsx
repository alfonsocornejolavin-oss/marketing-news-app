import React from 'react';

/**
 * Renders a horizontal list of buttons allowing the user to switch between
 * countries. The active tab is highlighted. When a tab is clicked the
 * `onSelect` callback is invoked with the selected country name.
 *
 * @param {{ countries: string[], selectedCountry: string, onSelect: (country: string) => void }} props
 */
export default function CountryTabs({ countries, selectedCountry, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 border-b pb-2">
      {countries.map((country) => (
        <button
          key={country}
          type="button"
          onClick={() => onSelect(country)}
          className={`px-4 py-2 rounded-full text-sm font-medium focus:outline-none transition-colors duration-150 ${
            country === selectedCountry
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {country}
        </button>
      ))}
    </div>
  );
}
