/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#0a0a0f',
        charcoal: '#111118',
        surface: '#16161f',
        'surface-2': '#1c1c28',
        border: '#2a2a38',
        gold: '#c9a84c',
        'gold-light': '#e8c97a',
        'gold-dark': '#8a6e2e',
        muted: '#6b6b82',
        soft: '#a0a0b8',
        lite: '#e8e8f0',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
