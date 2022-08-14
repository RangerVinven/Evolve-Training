module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}'
  , './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        darkblue: "#1F5C78",
        green: "#1DA39A"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}