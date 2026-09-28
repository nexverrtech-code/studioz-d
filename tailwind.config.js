/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    // Breakpoints are intentionally explicit: the design is authored per band,
    // not shrunk down from desktop.
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1700px',
      // Interaction-capability queries keep hover-only behaviour off touch devices.
      hoverable: { raw: '(hover: hover) and (pointer: fine)' },
      touch: { raw: '(hover: none)' },
      'motion-ok': { raw: '(prefers-reduced-motion: no-preference)' },
    },
    extend: {
      colors: {
        ink: {
          50: '#F6F4F2',
          100: '#E8E4E0',
          200: '#BFB5AC',
          300: '#9A8F86',
          400: '#766B63',
          500: '#554C46',
          600: '#3C3531',
          700: '#2A2522',
          800: '#1D1917',
          900: '#14110F',
          950: '#0B0908',
        },
        ivory: {
          50: '#FDFBF7',
          100: '#F8F4EC',
          200: '#F1EADF',
          300: '#E6DCCD',
          400: '#D8CBB8',
          500: '#C4B49D',
        },
        champagne: {
          200: '#F0E5D2',
          300: '#E4D3B8',
          400: '#D8C09A',
          500: '#C9A876',
          600: '#B08E5C',
          700: '#8D7046',
        },
        terracotta: {
          300: '#DCAA90',
          400: '#C98A6B',
          500: '#B4704F',
          600: '#97593B',
        },
        rose: {
          300: '#DCC0C0',
          400: '#C9A4A4',
          500: '#B08888',
        },
        olive: {
          300: '#B0B294',
          400: '#8E9070',
          500: '#71734F',
        },
        /**
         * Sampled from the studio logo — the teal script and orange ring.
         * Secondary accents used where the UI sits beside the mark; the
         * ink/ivory/champagne system stays primary.
         */
        brand: {
          teal: '#028E93',
          'teal-light': '#30A4A9',
          'teal-pale': '#77C1C6',
          orange: '#F28C47',
          'orange-light': '#EEA678',
          'orange-pale': '#F3D2C1',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        // Fluid scale — every step is clamped so nothing overflows at 320px
        // and nothing balloons past 1920px.
        'fluid-xs': ['clamp(0.72rem, 0.70rem + 0.12vw, 0.80rem)', { lineHeight: '1.5' }],
        'fluid-sm': ['clamp(0.82rem, 0.79rem + 0.16vw, 0.92rem)', { lineHeight: '1.6' }],
        'fluid-base': ['clamp(0.94rem, 0.90rem + 0.22vw, 1.06rem)', { lineHeight: '1.7' }],
        'fluid-lg': ['clamp(1.06rem, 0.99rem + 0.34vw, 1.25rem)', { lineHeight: '1.6' }],
        'fluid-xl': ['clamp(1.22rem, 1.10rem + 0.58vw, 1.55rem)', { lineHeight: '1.45' }],
        'fluid-2xl': ['clamp(1.45rem, 1.25rem + 0.95vw, 2.05rem)', { lineHeight: '1.28' }],
        'fluid-3xl': ['clamp(1.75rem, 1.42rem + 1.60vw, 2.85rem)', { lineHeight: '1.16' }],
        'fluid-4xl': ['clamp(2.10rem, 1.58rem + 2.55vw, 3.90rem)', { lineHeight: '1.08' }],
        'fluid-5xl': ['clamp(2.50rem, 1.70rem + 3.90vw, 5.20rem)', { lineHeight: '1.02' }],
        'fluid-6xl': ['clamp(2.85rem, 1.70rem + 5.60vw, 6.80rem)', { lineHeight: '0.98' }],
      },
      letterSpacing: {
        'widest-xl': '0.22em',
        'widest-2xl': '0.32em',
      },
      maxWidth: {
        shell: '1400px',
        prose: '68ch',
        'prose-sm': '54ch',
      },
      spacing: {
        /**
         * Vertical rhythm, tightened.
         *
         * The previous scale topped out at 8rem/128px per section, which on a
         * 1440px screen meant a quarter of the viewport was empty between
         * every band — airy in a mockup, tiring to actually scroll. These
         * caps are ~30% lower while the mobile floor barely moves, since
         * small screens were never the problem.
         */
        section: 'clamp(2rem, 1.5rem + 2vw, 3.5rem)',
        'section-sm': 'clamp(1.5rem, 1.25rem + 1vw, 2.25rem)',
        /** Horizontal gutter: 16 / 24 / 32 / 48px by breakpoint, unchanged. */
        gutter: 'clamp(1rem, 0.55rem + 2.2vw, 2rem)',
        'safe-b': 'env(safe-area-inset-bottom, 0px)',
      },
      aspectRatio: {
        '4/5': '4 / 5',
        '3/4': '3 / 4',
        '2/3': '2 / 3',
        '3/2': '3 / 2',
        '4/3': '4 / 3',
        '16/9': '16 / 9',
        '21/9': '21 / 9',
      },
      borderRadius: {
        card: '2px',
      },
      boxShadow: {
        lift: '0 18px 48px -24px rgba(11, 9, 8, 0.45)',
        'lift-lg': '0 34px 80px -32px rgba(11, 9, 8, 0.55)',
        hairline: '0 1px 0 0 rgba(20, 17, 15, 0.08)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
        'editorial-in': 'cubic-bezier(0.62, 0.05, 0.36, 1)',
      },
      /**
       * Named stacking order. Must stay in sync with the `--z-*` tokens in
       * `styles/variables.css`, which documents what each layer is for.
       * Nothing in the codebase sets a bare numeric z-index.
       */
      zIndex: {
        base: '1',
        raised: '10',
        sticky: '40',
        dock: '55',
        header: '60',
        drawer: '70',
        lightbox: '90',
        cursor: '100',
      },
      keyframes: {
        'grain-shift': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '25%': { transform: 'translate3d(-2%, 1%, 0)' },
          '50%': { transform: 'translate3d(1%, -2%, 0)' },
          '75%': { transform: 'translate3d(2%, 2%, 0)' },
        },
        'marquee-x': {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(-50%, 0, 0)' },
        },
        /* Footer slideshow: visible for a quarter of the cycle, crossfading
           into the next. Assumes 4 slides - see Slideshow in Footer.jsx. */
        'slide-fade': {
          '0%, 20%': { opacity: '1' },
          '25%, 95%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'shimmer-x': {
          from: { transform: 'translate3d(-100%, 0, 0)' },
          to: { transform: 'translate3d(100%, 0, 0)' },
        },
      },
      animation: {
        grain: 'grain-shift 8s steps(6) infinite',
        marquee: 'marquee-x 38s linear infinite',
        shimmer: 'shimmer-x 1.6s ease-in-out infinite',
        slideshow: 'slide-fade 16s linear infinite',
      },
    },
  },
  plugins: [],
};
