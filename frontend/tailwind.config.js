/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
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
  				100: 'var(--ink-100)',
  				200: 'var(--ink-200)',
  				300: 'var(--ink-300)',
  				400: 'var(--ink-400)',
  				500: 'var(--ink-500)',
  				600: 'var(--ink-600)',
  				700: 'var(--ink-700)',
  				800: 'var(--ink-800)',
  				900: 'var(--ink-900)',
  				950: 'var(--ink-950)'
  			},
  			violet: {
  				50: 'var(--violet-50)',
  				100: 'var(--violet-100)',
  				200: 'var(--violet-200)',
  				300: 'var(--violet-300)',
  				400: 'var(--violet-400)',
  				500: 'var(--violet-500)',
  				600: 'var(--violet-600)',
  				700: 'var(--violet-700)',
  				800: 'var(--violet-800)',
  				900: 'var(--violet-900)'
  			},
  			green: {
  				100: 'var(--green-100)',
  				300: 'var(--green-300)',
  				500: 'var(--green-500)',
  				600: 'var(--green-600)',
  				700: 'var(--green-700)'
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
