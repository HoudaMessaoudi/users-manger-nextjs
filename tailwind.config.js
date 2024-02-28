/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui'],
      },
      colors: {
        gray: {
          50: "#F7F8FA",
          200: "#BCCADC80",
          600: "#627D98",
        },
        colors: {
          brand :{
            'custom-border': '#BCCADC',
            'primary-color': '#104EE9',
            'danger' : '#FF4D4F',
            'success-color' : '#28AD2E',
            'grey-600-color' : '#627D98',
            'grey-200-color' : '#BCCADC80',
            'grey-050-color' : '#F7F8FA',
            'grey-900-color': '#0E1823'
          }
        },
      },
      dropShadow: {
        lg: ["0 4px 20px rgb(0 0 0  / 0.08)"],
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [require("daisyui")],
};
