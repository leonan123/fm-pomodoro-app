import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/_components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsla(var(--background))',
        foreground: 'hsla(var(--foreground))',
        primary: 'hsla(var(--primary))',
        'primary-foreground': 'hsla(var(--primary-foreground))',
        muted: 'hsla(var(--muted))',
      },

      backgroundImage: {
        progress:
          'radial-gradient(closest-side, hsla(var(--muted)) 85%, transparent 80% 100%), conic-gradient(hsla(var(--primary)) 75%, transparent 0);',
      },

      fontFamily: {
        base: 'var(--font-base)',
      },
    },
  },
  plugins: [],
} satisfies Config
