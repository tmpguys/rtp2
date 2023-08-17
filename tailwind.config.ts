import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'shining': 'shining 2s ease-out infinite'
      },
      keyframes: {
        shining: {
          "0%": {
            right: "100%",
            opacity: "0"
          },
          "50%": {
            opacity: "0.3"
          },
          "100%": {
            right: "0",
          }
        }
      }
    },
  },
  plugins: [],
}
export default config
