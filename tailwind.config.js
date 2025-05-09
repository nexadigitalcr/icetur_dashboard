/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'carbon-black': '#121212',
        'carbon-gray': '#1E1E1E',
        'accent-orange': '#FF5722',
        'accent-orange-light': '#FF7043',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#fff',
            h1: {
              color: '#fff',
            },
            h2: {
              color: '#fff',
            },
            h3: {
              color: '#fff',
            },
            strong: {
              color: '#fff',
            },
            a: {
              color: '#FF5722',
              '&:hover': {
                color: '#FF7043',
              },
            },
            code: {
              color: '#FF5722',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};