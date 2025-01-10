import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/_components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        muted: 'hsl(var(--muted))',
        'secondary-foreground': 'hsl(var(--secondary-foreground))',
      },

      backgroundImage: {
        progress:
          'radial-gradient(closest-side, hsl(var(--muted)) 85%, transparent 80% 100%), conic-gradient(hsl(var(--primary)) 75%, transparent 0);',
      },

      fontFamily: {
        base: 'var(--font-base)',
      },
    },
  },
  plugins: [],
} satisfies Config
