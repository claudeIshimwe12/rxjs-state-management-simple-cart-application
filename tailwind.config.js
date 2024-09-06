/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        red: "#c73B0F",
        rose_900: "#260F08",
        rose_500: "#87635A",
        rose_400: "#AD8A85",
        rose_300: "#CAAFA7",
        rose_100: "#F5EEEC",
        rose_50: "#FCF8F6",
        green: "#1EA575",
      },
      fontSize: {
        preset1: "56px",
        preset2: "40px",
        preset3: "24px",
        preset4: "16px",
      },
    },
  },
  plugins: [],
};
