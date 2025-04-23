/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      sm: "360px", // Mobile
      md: "768px", // Tablets
      lg: "992px", // Laptops
      xl: "1200px", // Desktops
      xxl: "1620px", // Extra-large screens
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '2rem', // Padding for larger screens
        sm: '1rem', // Padding for small devices (mobile)
        md: '2rem', // Padding for medium devices (tablets)
      },
    },
    extend: {
      backgroundColor: {
        'custom-green': 'rgba(0, 191, 99, 0.5)',
      },
      fontSize: {
        small: "1rem", // Small size equivalent to text-lg
        medium: "1.5rem", // Medium size equivalent to text-2xl
        large: "1rem", // Large size equivalent to text-3xl
        extraLarge: "1rem", // Extra large size equivalent to text-4xl
      },
      colors: {
        primary: "#00BF63",
        secondary: "#E6F9EF",
        textGray: "#494949",
      },
    },
  },
  plugins: [],
};
