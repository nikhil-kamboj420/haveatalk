/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        kabisat: ["Kabisat", "serif"],
        organical: ["Organical" || "mori"],
        dragrace: ["Dragrace" || "mori"],
      },
    },
  },
  plugins: [],
};
