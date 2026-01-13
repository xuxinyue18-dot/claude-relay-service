/** @type {import('tailwindcss').Config} */
const tint = (rgbVar, pct) =>
  `color-mix(in srgb, rgb(var(${rgbVar}) / <alpha-value>) ${pct}%, white)`
const shade = (rgbVar, pct) =>
  `color-mix(in srgb, rgb(var(${rgbVar}) / <alpha-value>) ${pct}%, black)`

const themedScale = (rgbVar) => ({
  50: tint(rgbVar, 8),
  100: tint(rgbVar, 12),
  200: tint(rgbVar, 18),
  300: tint(rgbVar, 28),
  400: tint(rgbVar, 42),
  500: `rgb(var(${rgbVar}) / <alpha-value>)`,
  600: shade(rgbVar, 88),
  700: shade(rgbVar, 78),
  800: shade(rgbVar, 68),
  900: shade(rgbVar, 55),
  950: shade(rgbVar, 42)
})

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 语义化主题色（新代码优先使用），统一“科技感”配色来源。
        primary: themedScale('--primary-rgb'),
        secondary: themedScale('--secondary-rgb'),
        accent: themedScale('--accent-rgb'),
        magenta: themedScale('--accent2-rgb'),

        // 将 Tailwind 常用色系收敛到主题变量，避免局部 text-blue-* / from-blue-* 等跑偏。
        blue: themedScale('--primary-rgb'),
        indigo: themedScale('--secondary-rgb'),
        purple: themedScale('--secondary-rgb'),
        violet: themedScale('--secondary-rgb'),
        sky: themedScale('--accent-rgb'),
        cyan: themedScale('--accent-rgb'),
        teal: themedScale('--accent-rgb'),
        pink: themedScale('--accent2-rgb')
      },
      animation: {
        gradient: 'gradient 8s ease infinite',
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite'
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 }
        }
      }
    }
  },
  plugins: []
}
