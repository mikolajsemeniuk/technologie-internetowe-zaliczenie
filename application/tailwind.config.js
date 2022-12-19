/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%': { transform: 'translateX(50px)', opacity: 0 },
          '50%': { transform: 'translateX(0px)', opacity: 1 },
          '100%': { transform: 'translateX(50px)', opacity: 0 },
        }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out normal',
      }
    }
  },
  plugins: [],
}