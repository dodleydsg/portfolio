/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html"],
  theme: {
    extend: {
      fontFamily:{
        'sans': ['Inter',],
        'serif': ['Playfair Display'],
        'mono': ['Jetbrains Mono']
      }
    },
  },
  plugins: [],
};
