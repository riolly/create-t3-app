/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Autour One', 'cursive'],
        body: ['Abel', 'sans-serif'],
        highlight: ['Architects Daughter', 'cursive'],
      },
      colors: {
        bg: {
          light: colors.slate[50],
          dark: colors.slate[900],
        },
        light: {
          primary: colors.slate[200],
          secondary: colors.slate[400],
        },
        dark: {
          primary: colors.slate[800],
          secondary: colors.slate[600],
        },
        primary: {
          lightest: colors.indigo[100],
          lighter: colors.indigo[300],
          normal: colors.indigo[500],
          darker: colors.indigo[700],
          darkest: colors.indigo[900],
        },
        secondary: {
          lightest: colors.violet[50],
          lighter: colors.violet[200],
          normal: colors.violet[400],
          darker: colors.violet[600],
          darkest: colors.violet[700],
        },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
