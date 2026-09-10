import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],

  // O site publicado fica em jkuppersouza.github.io/crm/, então o build
  // precisa saber que mora na subpasta /crm/. Em desenvolvimento
  // continua na raiz, para `npm run dev` abrir em localhost:5173/.
  // ⚠️ Se você renomear o repositório, troque '/crm/' pelo novo nome.
  base: command === 'build' ? '/crm/' : '/',

  server: {
    port: 5173,
    open: true,
  },
}))
