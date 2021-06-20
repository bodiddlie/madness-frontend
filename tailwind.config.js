module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'hero-image':
          "url('https://images.unsplash.com/photo-1550353127-b0da3aeaa0ca?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3902&q=80')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
