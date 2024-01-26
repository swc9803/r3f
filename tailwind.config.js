/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      serif: ['Playfair Display', ...defaultTheme.fontFamily.serif],
      sans: ['Poppins', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
