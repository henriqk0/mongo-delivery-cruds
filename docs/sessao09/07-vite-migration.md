# Prompt 7 — Migração de CRA para Vite

## Prompts
- "but with 13 vulnerabilities" (discussão sobre vulnerabilidades do react-scripts)
- "Sim, migrar para Vite" (resposta à pergunta sobre migração)

## Ações
- Instalado `vite` e `@vitejs/plugin-react`
- Removido `react-scripts`
- Criado `vite.config.ts` com servidor na porta 3000
- Criado `postcss.config.js` para Tailwind
- Movido `index.html` da pasta `public/` para a raiz, com `<script type="module" src="/src/index.tsx">`
- Atualizado `tsconfig.json` para configuração compatível com Vite (target ES2020, moduleResolution node)
- Alterado `process.env.REACT_APP_BACKEND_URL` para `import.meta.env.VITE_BACKEND_URL`
- Renomeado `.env.local`: `REACT_APP_BACKEND_URL` → `VITE_BACKEND_URL`
- Atualizados scripts do `package.json`: `start` → `vite`, `build` → `tsc && vite build`
- Removida pasta `public/`
- Adicionado `/dist` ao `.gitignore`
- Resultado: 0 vulnerabilidades, build em ~620ms, dev server em ~227ms
