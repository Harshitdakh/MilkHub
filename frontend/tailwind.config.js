/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Vibrant & Elegant Dairy Theme
        primary: {
          light: '#E0F2FE', // Very soft blue
          DEFAULT: '#0EA5E9', // Vibrant Sky Blue
          dark: '#0369A1', 
        },
        accent: {
          yellow: '#FACC15', // Bright Sunflower
          mint: '#10B981',   // Fresh Green (Trust/Health)
        },
        neutral: '#0F172A', // Slate 900 for premium typography
        cream: '#FFFBEB',   // Soft background alternative
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 100%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      }
    },
  },
  plugins: [],
}