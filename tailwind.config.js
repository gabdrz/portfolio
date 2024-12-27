/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        shirtBlue: '#466A85',
        shirtBlueDark: '#2F4B5E',
        shirtBlueLight: '#8AA4B5',
        
        tieBlack: '#1A1A1A',
        tieGray: '#333333',
        
        backgroundTeal: '#2D3A45',
        backgroundTealDark: '#1C2A33',
        backgroundTealLight: '#4B5C68',
      },
    },
  },
  plugins: [],
};
