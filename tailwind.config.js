module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        expando: 'repeat(auto-fill, minmax(400px, 1fr) )',
      },
      colors: {
        'pale-cream': '#e6e6e6',
        'dark-slate-gray': '#35524A',
        'slate-gray': '#627C85',
        'pewter-blue': '#779CAB',
        'middle-blue-green': '#A2E8DD',
        'medium-spring-green': '#32DE8A',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      backgroundColor: ['disabled'],
      borderColor: ['disabled'],
    },
  },
  plugins: [],
};
