module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  // mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    minWidth: {
      '1/4': '25%',
     },
    zIndex:{
      '-1':'-1',
    },
    fontFamily:{
      'lobster': 'Lobster, Helvetica, Arial, sans-serif',
      'lato': 'Lato, Helvetica, Arial, sans-serif',
      'body': ['"Lato"'],
    },
    // extend: {},
    container: {
      center: true,
      padding: '2rem',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
