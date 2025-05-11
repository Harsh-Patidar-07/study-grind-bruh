
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          'primary-foreground': "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          'accent-foreground': "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))"
        },
        // Custom colors for our Gen-Z app
        genz: {
          purple: "#9B87F5",
          blue: "#7E69AB",
          green: "#4EE19B",
          pink: "#FF7AAC",
          orange: "#FF965B",
        },
        // Material Design system colors
        "md-primary": "hsl(var(--md-sys-color-primary))",
        "md-on-primary": "hsl(var(--md-sys-color-on-primary))",
        "md-primary-container": "hsl(var(--md-sys-color-primary-container))",
        "md-on-primary-container": "hsl(var(--md-sys-color-on-primary-container))",
        "md-secondary": "hsl(var(--md-sys-color-secondary))",
        "md-on-secondary": "hsl(var(--md-sys-color-on-secondary))",
        "md-secondary-container": "hsl(var(--md-sys-color-secondary-container))",
        "md-on-secondary-container": "hsl(var(--md-sys-color-on-secondary-container))",
        "md-tertiary": "hsl(var(--md-sys-color-tertiary))",
        "md-on-tertiary": "hsl(var(--md-sys-color-on-tertiary))",
        "md-tertiary-container": "hsl(var(--md-sys-color-tertiary-container))",
        "md-on-tertiary-container": "hsl(var(--md-sys-color-on-tertiary-container))",
        "md-error": "hsl(var(--md-sys-color-error))",
        "md-on-error": "hsl(var(--md-sys-color-on-error))",
        "md-error-container": "hsl(var(--md-sys-color-error-container))",
        "md-on-error-container": "hsl(var(--md-sys-color-on-error-container))",
        "md-surface": "hsl(var(--md-sys-color-surface))",
        "md-on-surface": "hsl(var(--md-sys-color-on-surface))",
        "md-surface-variant": "hsl(var(--md-sys-color-surface-variant))",
        "md-on-surface-variant": "hsl(var(--md-sys-color-on-surface-variant))",
        "md-outline": "hsl(var(--md-sys-color-outline))",
        "md-outline-variant": "hsl(var(--md-sys-color-outline-variant))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        },
        "pulse-glow": {
          "0%, 100%": { 
            boxShadow: "0 0 0 0 rgba(155, 135, 245, 0)"
          },
          "50%": { 
            boxShadow: "0 0 15px 5px rgba(155, 135, 245, 0.4)"
          }
        },
        "bounce-slight": {
          "0%, 100%": { 
            transform: "translateY(0)"
          },
          "50%": {
            transform: "translateY(-5px)"
          }
        },
        "float": {
          "0%, 100%": {
            transform: "translateY(0)"
          },
          "50%": {
            transform: "translateY(-10px)"
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s infinite",
        "bounce-slight": "bounce-slight 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
        meme: ['Comic Sans MS', 'Comic Sans', 'cursive']
      },
    }
  },
  plugins: [require("tailwindcss-animate")]
} satisfies Config;
