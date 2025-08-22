/**
 * Tailwind CSS configuration.
 *
 * The `content` array tells Tailwind where to look for class names so it can
 * tree‑shake unused styles. We include the pages, components and config
 * directories here. Extend or customize the theme as needed to match your
 * branding. See https://tailwindcss.com/docs/configuration for more details.
 */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // If you need to adjust the default colour palette or add your own
      // custom utility classes, you can do so here. Leaving this empty
      // retains Tailwind's sensible defaults.
    },
  },
  plugins: [],
};
