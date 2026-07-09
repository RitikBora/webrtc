/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  			body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  		},
  		borderRadius: {
  			xs: 'var(--radius-xs)',
  			sm: 'var(--radius-sm)',
  			md: 'var(--radius-md)',
  			lg: 'var(--radius-lg)',
  			xl: 'var(--radius-xl)',
  			pill: 'var(--radius-pill)',
  		},
  		boxShadow: {
  			xs: 'var(--shadow-xs)',
  			sm: 'var(--shadow-sm)',
  			md: 'var(--shadow-md)',
  			lg: 'var(--shadow-lg)',
  			focus: 'var(--shadow-focus)',
  			'accent-glow': 'var(--shadow-accent-glow)',
  		},
  		transitionTimingFunction: {
  			smooth: 'var(--ease-smooth)',
  			standard: 'var(--ease-standard)',
  			spring: 'var(--ease-spring)',
  		},
  		transitionDuration: {
  			fast: 'var(--dur-fast)',
  			base: 'var(--dur-base)',
  			slow: 'var(--dur-slow)',
  			slower: 'var(--dur-slower)',
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			ink: {
  				0: 'var(--ink-0)',
  				50: 'var(--ink-50)',
  				800: 'var(--ink-800)',
  				900: 'var(--ink-900)',
  				950: 'var(--ink-950)'
  			},
  			connected: {
  				DEFAULT: 'var(--status-connected)',
  				bg: 'var(--status-connected-bg)',
  				text: 'var(--status-connected-text)'
  			},
  			danger: {
  				DEFAULT: 'var(--status-danger)',
  				bg: 'var(--status-danger-bg)',
  				text: 'var(--status-danger-text)'
  			},
  			warning: {
  				DEFAULT: 'var(--status-warning)',
  				bg: 'var(--status-warning-bg)',
  				text: 'var(--status-warning-text)'
  			},
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
