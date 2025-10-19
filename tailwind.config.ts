import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors (warm orange/red inspired by food)
        primary: {
          50: "var(--color-primary-50)",
          100: "var(--color-primary-100)",
          200: "var(--color-primary-200)",
          300: "var(--color-primary-300)",
          400: "var(--color-primary-400)",
          500: "var(--color-primary-500)",
          600: "var(--color-primary-600)",
          700: "var(--color-primary-700)",
          800: "var(--color-primary-800)",
          900: "var(--color-primary-900)",
          950: "var(--color-primary-950)",
        },
        // Secondary colors (fresh green inspired by herbs/vegetables)
        secondary: {
          50: "var(--color-secondary-50)",
          100: "var(--color-secondary-100)",
          200: "var(--color-secondary-200)",
          300: "var(--color-secondary-300)",
          400: "var(--color-secondary-400)",
          500: "var(--color-secondary-500)",
          600: "var(--color-secondary-600)",
          700: "var(--color-secondary-700)",
          800: "var(--color-secondary-800)",
          900: "var(--color-secondary-900)",
          950: "var(--color-secondary-950)",
        },
        // Accent colors (purple for premium/special features)
        accent: {
          50: "var(--color-accent-50)",
          100: "var(--color-accent-100)",
          200: "var(--color-accent-200)",
          300: "var(--color-accent-300)",
          400: "var(--color-accent-400)",
          500: "var(--color-accent-500)",
          600: "var(--color-accent-600)",
          700: "var(--color-accent-700)",
          800: "var(--color-accent-800)",
          900: "var(--color-accent-900)",
          950: "var(--color-accent-950)",
        },
        // Semantic colors
        success: {
          light: "var(--color-success-light)",
          DEFAULT: "var(--color-success)",
          dark: "var(--color-success-dark)",
        },
        warning: {
          light: "var(--color-warning-light)",
          DEFAULT: "var(--color-warning)",
          dark: "var(--color-warning-dark)",
        },
        error: {
          light: "var(--color-error-light)",
          DEFAULT: "var(--color-error)",
          dark: "var(--color-error-dark)",
        },
        info: {
          light: "var(--color-info-light)",
          DEFAULT: "var(--color-info)",
          dark: "var(--color-info-dark)",
        },
      },
      fontFamily: {
        heading: ["var(--font-family-heading)"],
        body: ["var(--font-family-body)"],
        mono: ["var(--font-family-mono)"],
      },
      borderRadius: {
        sm: "var(--border-radius-sm)",
        DEFAULT: "var(--border-radius)",
        lg: "var(--border-radius-lg)",
        xl: "var(--border-radius-xl)",
        "2xl": "var(--border-radius-2xl)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        primary: "var(--shadow-primary)",
        secondary: "var(--shadow-secondary)",
        accent: "var(--shadow-accent)",
      },
      animation: {
        "bounce-gentle": "bounce-gentle 2s infinite",
        "slide-up": "slide-up 0.4s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
      },
      keyframes: {
        "bounce-gentle": {
          "0%, 20%, 53%, 80%, 100%": {
            transform: "translate3d(0, 0, 0)",
          },
          "40%, 43%": {
            transform: "translate3d(0, -8px, 0)",
          },
          "70%": {
            transform: "translate3d(0, -4px, 0)",
          },
          "90%": {
            transform: "translate3d(0, -2px, 0)",
          },
        },
        "slide-up": {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in": {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-600) 100%)",
        "gradient-secondary":
          "linear-gradient(135deg, var(--color-secondary-500) 0%, var(--color-secondary-600) 100%)",
        "gradient-accent":
          "linear-gradient(135deg, var(--color-accent-500) 0%, var(--color-accent-600) 100%)",
        "gradient-warm":
          "linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-accent-500) 100%)",
        "gradient-fresh":
          "linear-gradient(135deg, var(--color-secondary-500) 0%, var(--color-primary-500) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
