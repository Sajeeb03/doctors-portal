/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        doctorsPortal: {
          "primary": "#0FCFEC",

          "secondary": "#19D3AE",

          "accent": "#3A4256",

          "neutral": "#253341",

          "base-100": "#F9F5FA",

          "info": "#8192DA",

          "success": "#32E284",

          "warning": "#EBC94C",

          "error": "#F96675",
        }
      }
    ]
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
