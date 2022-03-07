const tailwindConfig = require('config/tailwind.config');

module.exports = {
  ...tailwindConfig,
  content: [
    'src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
  ]
};
