/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      turquoise: "#03DAC6",
      purple: "#BB92FC",
      darkgrey: "#3C4042",
      white: "#F2F5F7",
      darkblue:"#242A59"
      },
    extend: {
      fontFamily: {
         sans: ['var(--font-roboto-flex)'],
         serif: ['var(--font-fraunces)']
      }
    },
  },
  plugins: [],
}
