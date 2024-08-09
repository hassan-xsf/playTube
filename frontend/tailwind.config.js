/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xsm': '450px',
        '3xl': '1600px', // Custom extra-extra-large breakpoint
        '4xl': '1920px', // Custom 4xl breakpoint
        '5xl': '2240px', // Custom 5xl breakpoint
        '6xl': '2560px', // Custom 6xl breakpoint
        '7xl': '2880px', // Custom 7xl breakpoint
      },
      colors: {
        'primary-black': '#0F0F0F'
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}