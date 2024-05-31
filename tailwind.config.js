/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        custom: "rgba(3, 0, 54, 0.74)",
        main: '#7E1593',
        dark: '#474747',
        light: '#A9A9A9',
      },
    },
  },
  plugins: [],
};
