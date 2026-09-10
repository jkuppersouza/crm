/** @type {import('tailwindcss').Config} */

// ════════════════════════════════════════════════════════════════════
//  ⚠️  NÃO EDITE AS CORES AQUI.
//  As cores da marca vivem em `src/config/theme.js` e são injetadas
//  como variáveis CSS (--brand-50 … --brand-950) em tempo de execução.
//  Assim dá para trocar a cor da apresentação sem recompilar nada.
// ════════════════════════════════════════════════════════════════════

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Paleta da marca — controlada por src/config/theme.js
        brand: {
          50: 'rgb(var(--brand-50) / <alpha-value>)',
          100: 'rgb(var(--brand-100) / <alpha-value>)',
          200: 'rgb(var(--brand-200) / <alpha-value>)',
          300: 'rgb(var(--brand-300) / <alpha-value>)',
          400: 'rgb(var(--brand-400) / <alpha-value>)',
          500: 'rgb(var(--brand-500) / <alpha-value>)',
          600: 'rgb(var(--brand-600) / <alpha-value>)',
          700: 'rgb(var(--brand-700) / <alpha-value>)',
          800: 'rgb(var(--brand-800) / <alpha-value>)',
          900: 'rgb(var(--brand-900) / <alpha-value>)',
          950: 'rgb(var(--brand-950) / <alpha-value>)',
        },

        // ────────────────────────────────────────────────────────────
        // 🎨 ESCALA NEUTRA (o "cinza" de toda a interface).
        //    São exatamente as cores `gray` do template SaaS:
        //      gray-400 #9ca3af → textos secundários
        //      gray-700 #374151 → bordas do badge
        //      gray-800 #1f2937 → bordas e superfícies (border-gray-800/50)
        //      gray-900 #111827 → fundo dos cards
        //      950      #000000 → bg-black da página
        //    Mexer aqui muda fundo, cards, bordas e textos de UMA VEZ.
        // ────────────────────────────────────────────────────────────
        slate: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#000000',
        },

        // Cor do texto sobre a cor da marca (preto no tema branco/mono)
        'brand-fg': 'rgb(var(--brand-fg) / <alpha-value>)',
      },
      fontFamily: {
        // 🎨 FONTE PRINCIPAL — troque aqui e no <link> do index.html
        sans: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(15 23 42 / 0.04), 0 1px 3px 0 rgb(15 23 42 / 0.06)',
        'card-hover': '0 4px 12px -2px rgb(15 23 42 / 0.08), 0 2px 6px -2px rgb(15 23 42 / 0.06)',
        float: '0 10px 40px -12px rgb(15 23 42 / 0.18)',
        modal: '0 25px 50px -12px rgb(15 23 42 / 0.35)',
        // 🎨 Brilho suave usado nos CTAs e no card em destaque
        glow: '0 0 0 1px rgb(255 255 255 / 0.06), 0 8px 40px -8px rgb(255 255 255 / 0.12)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'translateY(8px) scale(0.97)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(24px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-left': {
          from: { opacity: '0', transform: 'translateX(-100%)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out both',
        'scale-in': 'scale-in 0.22s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-in-right': 'slide-in-right 0.28s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-in-left': 'slide-in-left 0.28s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-up': 'slide-up 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
}
