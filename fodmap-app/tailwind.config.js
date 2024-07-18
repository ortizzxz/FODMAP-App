module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      main: '#191616',
      second: '#dbdfe5',
      third: '#a59e92',
      fourth: '#00bff2'
    },
    extend: {
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
      },
      placeholderColor: theme => ({
        'custom-placeholder': theme('colors.main'), // Usando el color 'main' definido arriba
      }),
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
