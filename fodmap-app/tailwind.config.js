/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'main': '#191616',
      'second': '#dbdfe5',
      'third': '#a59e92',
    },
    extend: {
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
      },
      placeholderColor: {
        'custom-placeholder': '#191616',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
