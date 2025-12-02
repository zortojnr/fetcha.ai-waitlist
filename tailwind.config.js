/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#F3C969',
          amber: '#F59E0B',
          slate: '#0b0d12'
        }
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.05)' }
        }
      },
      animation: {
        glow: 'glow 8s ease-in-out infinite'
      },
      boxShadow: {
        card: '0 8px 30px rgba(0,0,0,0.35)'
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  darkMode: 'class'
}

