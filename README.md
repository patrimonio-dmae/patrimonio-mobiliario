# Patrimônio Mobiliário — Gestão de Bens

Sistema web interno para controle do acervo mobiliário da equipe:
cadastro, localização, movimentações, inventário e importação/exportação Excel.

## Como publicar
1. Crie um repositório no GitHub e envie estes arquivos para a branch `main` (na raiz).
2. No repositório: **Settings → Pages → Source: GitHub Actions**.
3. Pronto — cada `push` publica automaticamente a nova versão.

> Para testar localmente sem servidor, basta abrir o `index.html` no navegador.

## Perfis de acesso (demonstração)
| Login | Senha | Papel |
|---|---|---|
| pedro / luiz | admin123 | Administrador |
| nicholas / joaopaulo / renato | editor123 | Editor |
| andre / paolla / higor / joaovictor | consulta123 | Consulta |

## Estrutura
- `index.html` — aplicativo completo (dashboard, bens, movimentações, importação, usuários)
- `data.js` — base inicial com 159 bens extraídos da planilha original
- `manifest.json` + `icon.svg` + `sw.js` — instalável como app e funciona offline
- `.github/workflows/deploy.yml` — publicação automática no GitHub Pages