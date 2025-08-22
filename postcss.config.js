/**
 * PostCSS configuration for the marketing news application.
 *
 * This file wires up Tailwind CSS and Autoprefixer. Tailwind generates
 * utility classes based on the configuration defined in `tailwind.config.js`,
 * while Autoprefixer ensures your CSS works consistently across browsers
 * by adding necessary vendor prefixes.
 */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
