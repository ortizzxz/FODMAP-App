module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      main: '#54652a',
      second: '#54652d',
      third: '#a59e92',
      fourth: '#000000'
    },
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      placeholderColor: theme => ({
        'custom-placeholder': theme('colors.fourth'), //colors -> main 
      }),
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
