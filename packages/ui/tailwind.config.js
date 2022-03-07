const tailwindConfig = require('config/tailwind.config');

module.exports = {
  ...tailwindConfig,
  content: ['./**/*.{js,ts,jsx,tsx}'],
};
