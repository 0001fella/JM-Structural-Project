/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // essential for dark/light toggle
  theme: {
    extend: {
      colors: {
        primary: "#0f4c75",
        secondary: "#3282b8",
        accent: "#f9a826",
        dark: "#1b262c",
        light: "#bbe1fa",
        muted: "#f0f4f8"
      },
      backgroundImage: {
        // Add image-based backgrounds
        'dashboard-pattern': "url('/images/dashboard-bg.jpg')",
        'hero-pattern': "url('/images/hero.jpg')",
        'gradient-radial': "radial-gradient(var(--tw-gradient-stops))",
        'gradient-conic': "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 1.5s ease-out both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        }
      }
    },
  },
  plugins: [],
}
