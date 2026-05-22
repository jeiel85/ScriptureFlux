/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          darkBg: '#0a0f1e', // Deep Navy
          darkCard: 'rgba(15, 23, 42, 0.6)', // Glassmorphism card bg
          accent: '#10b981', // Emerald Active
          ot: '#3b82f6', // Old Testament Blue (e.g. #3b82f6 or #60a5fa)
          nt: '#ec4899', // New Testament Rose/Pink (e.g. #ec4899 or #f43f5e)
        }
      }
    },
  },
  plugins: [],
}
