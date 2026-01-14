// tailwind.config.js
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        loginPageColor: '#FDB4B4',
        'misty-blue': '#cfdbe6',
        'deep-slate': '#0f172a',
      },
      fontFamily: {
        fantasy: ['fantasy'],
      },
    },
  },
  plugins: [],
}
