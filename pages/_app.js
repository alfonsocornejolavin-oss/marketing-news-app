import '../styles/globals.css';
import React from 'react';

/**
 * Custom App component for Next.js.
 *
 * This file wraps every page in the application. We import the global
 * Tailwind CSS here so it applies to all pages. Additional providers
 * (e.g. for state management or internationalisation) could be added
 * here in the future.
 */
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
