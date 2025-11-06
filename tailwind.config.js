/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6EE7B7",
          dark: "#0E8F6A"
        },
        secondary: {
          DEFAULT: "#1D4ED8",
          light: "#93C5FD"
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at top, rgba(110, 231, 183, 0.6), rgba(14, 143, 106, 0.2))',
        'gradient-glass': 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(110,231,183,0.15))'
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glass: "0 20px 50px -20px rgba(14, 143, 106, 0.35)"
      }
    }
  },
  plugins: []
};
