import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}', // Ensure this line is present
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0070f3',
          success: '#17c964',
          danger: '#f42525',
        },
      },
    },
  },
  plugins: [],
}
export default config
