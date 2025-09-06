import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette matching the original design
        'coreo': {
          'fundo': '#111827',
          'fundo-secundaria': '#1f2937',
          'fundo-terciaria': '#374151',
          'borda': '#4b5563',
          'texto': '#e5e7eb',
          'destaque': '#3b82f6',
          'transicao': '#db2777',
          'playhead': '#f87171',
          'onda-audio': '#5eead4',
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif'
        ],
      },
    },
  },
  plugins: [],
};

export default config;