module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      main: '#54652a',
      second: '#E3E3E1',
      third: '#a59e92',
      fourth: '#00bff2'
    },
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      placeholderColor: theme => ({
        'custom-placeholder': theme('colors.main'), //colors -> main 
      }),
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
