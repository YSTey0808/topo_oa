/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void:    '#07090e',
        surface: '#0d1525',
        panel:   '#111e33',
        rim:     '#1b2f4a',
        portal:  '#22d3ee',
        morty:   '#fbbf24',
        alive:   '#4ade80',
        dead:    '#f87171',
        muted:   '#3d5a78',
      },
      fontFamily: {
        display: ['Rajdhani', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
