/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        panel: '#0f172a',
        panelLight: '#1e293b',
      },
    },
  },
  plugins: [],
};
