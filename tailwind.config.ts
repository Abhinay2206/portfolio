import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        accent: {
          primary: "#7c3aed",
          secondary: "#a855f7",
          tertiary: "#6366f1",
        },
      },
      animation: {
        "gradient": "gradient 6s linear infinite",
        "fade-in": "fadeIn 0.4s ease-out",
        "fade-in-up": "fadeInUp 0.5s ease-out",
        "slide-up": "slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-down": "slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        "scale-in": "scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "glow": "glow 2.5s ease-in-out infinite",
        "float": "float 5s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
      keyframes: {
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(124, 58, 237, 0.15)" },
          "50%": { boxShadow: "0 0 30px rgba(124, 58, 237, 0.25)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },
      backgroundSize: {
        "200%": "200% auto",
        "400%": "400% 100%",
      },
      boxShadow: {
        // Premium multi-layer shadows
        "sm": "0 1px 2px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.06)",
        "md": "0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.06)",
        "lg": "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.08)",
        "xl": "0 20px 40px -10px rgba(0, 0, 0, 0.12), 0 10px 20px -8px rgba(0, 0, 0, 0.08)",
        // Glow shadows
        "glow-sm": "0 0 20px -5px rgba(124, 58, 237, 0.2)",
        "glow-md": "0 0 30px -5px rgba(124, 58, 237, 0.25)",
        "glow-lg": "0 0 40px -5px rgba(124, 58, 237, 0.3)",
        // Card shadows
        "card": "0 4px 20px -2px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.02)",
        "card-hover": "0 20px 40px -10px rgba(0, 0, 0, 0.12), 0 0 40px -8px rgba(124, 58, 237, 0.15)",
        // Glass inner highlight
        "glass-inner": "inset 0 1px 0 rgba(255, 255, 255, 0.6)",
        "glass-inner-dark": "inset 0 1px 0 rgba(255, 255, 255, 0.08)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
      },
      transitionDuration: {
        "400": "400ms",
      },
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
        "bounce-soft": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "premium": "cubic-bezier(0.23, 1, 0.32, 1)",
      },
      backdropBlur: {
        "xs": "2px",
        "2xl": "24px",
        "3xl": "32px",
      },
    },
  },
  darkMode: "class",
  plugins: [],
} satisfies Config;
