/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        beige: '#FAF7F2',
        terracotta: '#C1714F',
        'terracotta-dark': '#A05A3A',
        'terracotta-light': '#D4956F',
        'text-primary': '#2C2825',
        'text-secondary': '#6B5E54',
        'border-soft': '#E8E0D5',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
