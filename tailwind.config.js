/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Make sure all your source files are included
  ],
  theme: {
    extend: {
      colors: {
        newBlue: "rgb(247,248,249)",
      },
    },
  },
  plugins: [],
};
