/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // --- Custom Colors ---
      colors: {
        primary: "#006d7e",
        secondary: "#254CBA",
        accent: "#CADBFB",
        dark: "#0D1C44",
        light: "#f0f0f0",
        muted: "#e0e7ee",
        danger: "#ef4444",
        success: "#22c55e",
        info: "#3b82f6",
      },

      // --- Custom Spacing & Sizing ---
      spacing: {
        '1/5': '20%',
        '1/4': '25%',
        '1/3': '33.333333%',
        '1/2': '50%',
        'hero-offset-lg': 'calc(100vh - 80px)',
      },
      height: {
        'screen-and-hero-offset': '100vh',
        '128': '32rem',
        '144': '36rem',
      },
      minHeight: {
        'hero-min': '600px',
      },

      // --- Custom Background Images ---
      backgroundImage: {
        'dashboard-pattern': "url('/images/dashboard-bg.jpg')",
        'hero-pattern': "url('/images/hero.jpg')",
        'feature-hero': "url('/feature.jpg')",
        'gradient-radial': "radial-gradient(var(--tw-gradient-stops))",
        'gradient-conic': "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'noise-pattern': "url('/images/noise.png')",
      },

      // --- Custom Animations ---
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 1.5s ease-out both',
        'slide-in-up': 'slideInUp 0.7s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'rotate-loop': 'rotateLoop 20s linear infinite',
        'glowing-border': 'glowingBorder 2s infinite alternate',
        'spin-slow': 'spin 10s linear infinite',
      },

      // --- Custom Keyframes ---
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideInUp: {
          '0%': { transform: 'translateY(50px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        rotateLoop: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        glowingBorder: {
          '0%': { borderColor: 'rgba(0, 109, 126, 0.3)' },
          '100%': { borderColor: 'rgba(0, 109, 126, 0.8)' },
        },
      },

      // --- Custom Typography ---
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },

      // --- Custom Shadows ---
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06), inset 0 0 0 1px rgba(0, 0, 0, 0.03)',
      },

      // --- Custom Transitions ---
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'colors-shadow': 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      transitionTimingFunction: {
        'ease-in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
    },
  },
  plugins: [],
};
