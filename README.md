# Monorepo Aviate: frontend + backend + Prisma + npm workspaces

Este guia mostra como juntar dois repositórios separados (`aviate-frontend` e `aviate-backend`) em um único monorepo, preservando o histórico com `git subtree` e rodando os dois projetos juntos com `concurrently`.

## Objetivo

Estrutura final esperada:

```txt
Aviate-app/
├── apps/
│   ├── frontend/
│   └── backend/
├── package.json
├── .gitignore
└── package-lock.json
```

A ideia é simples:

- um único repositório principal;
- frontend e backend dentro de `apps/`;
- um único `git push` para atualizar tudo;
- um comando para subir os dois projetos ao mesmo tempo.

---

## 1) Criar o repositório principal

Crie um repositório vazio no GitHub, por exemplo:

```txt
Aviate-app
```

Depois, clone esse repositório na sua máquina:

```bash
git clone https://github.com/SEU_USUARIO/Aviate-app.git
cd Aviate-app
```

---

## 2) Criar a estrutura de pastas

Dentro da raiz do monorepo, crie as pastas:

```bash
mkdir apps
mkdir apps/frontend
mkdir apps/backend
```

---

## 3) Importar os repositórios com histórico usando `git subtree`

Esse é o jeito certo de trazer o histórico dos dois projetos para dentro do monorepo.

### Importar o frontend

```bash
git remote add frontend https://github.com/SEU_USUARIO/aviate-frontend.git
git fetch frontend
git subtree add --prefix=apps/frontend frontend main
```

### Importar o backend

```bash
git remote add backend https://github.com/SEU_USUARIO/aviate-backend.git
git fetch backend
git subtree add --prefix=apps/backend backend main
```

> Se o branch principal dos seus repositórios for `master`, troque `main` por `master`.

---

## 4) Criar o `package.json` da raiz

Na raiz do monorepo, crie ou ajuste o `package.json` para ficar assim:

```json
{
  "name": "aviate-app",
  "private": true,
  "version": "1.0.0",
  "workspaces": [
    "apps/*"
  ],
  "scripts": {
    "dev": "concurrently \"npm run dev --workspace=frontend\" \"npm run dev --workspace=backend\""
  },
  "devDependencies": {
    "concurrently": "^9.2.1"
  }
}
```

### O que esse arquivo faz

- `private: true` impede publicação acidental no npm;
- `workspaces` diz ao npm para enxergar os projetos dentro de `apps/*`;
- `concurrently` roda os dois projetos ao mesmo tempo;
- o script `dev` sobe frontend e backend juntos.

---

## 5) Renomear os `package.json` internos

O nome do workspace vem do campo `"name"` do `package.json`, não do nome da pasta.

### Frontend

No arquivo `apps/frontend/package.json`, deixe algo assim:

```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

### Backend

No arquivo `apps/backend/package.json`, deixe algo assim:

```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "TypeScript Express backend with Prisma and authentication",
  "main": "dist/server.js",
  "scripts": {
    "dev": "nodemon src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "lint": "eslint src/**/*.ts",
    "lint:fix": "eslint src/**/*.ts --fix",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:studio": "prisma studio"
  }
}
```

---

## 6) Instalar as dependências da raiz

Na raiz do monorepo, rode:

```bash
npm install
```

Se quiser instalar o `concurrently` manualmente, também pode usar:

```bash
npm install -D concurrently
```

Mas se ele já estiver no `package.json`, o `npm install` normal já resolve.

---

## 7) Configurar o `.gitignore`

Na raiz, crie um `.gitignore` simples e funcional:

```gitignore
node_modules
**/node_modules
.env
**/.env
dist
build
coverage
.cache
.vscode
.DS_Store
```

### O que vai ser ignorado

- dependências instaladas (`node_modules`)
- arquivos de ambiente (`.env`)
- builds gerados (`dist`, `build`)
- cache e lixo local

### O que deve ser versionado

- código-fonte
- `package.json`
- `package-lock.json`
- `prisma/schema.prisma`
- migrations do Prisma

---

## 8) Prisma no backend

O Prisma deve continuar dentro do backend.

Exemplo de estrutura:

```txt
apps/backend/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
├── package.json
└── .env
```

### Gerar o client

Dentro do backend:

```bash
cd apps/backend
npx prisma generate
```

### Migrar o banco

```bash
npx prisma migrate dev
```

### Abrir o Prisma Studio

```bash
npx prisma studio
```

---

## 9) Rodar o projeto inteiro

Depois de tudo configurado, volte para a raiz e rode:

```bash
npm run dev
```

Isso vai executar:

- `npm run dev --workspace=frontend`
- `npm run dev --workspace=backend`

Ao mesmo tempo.

---

## 10) Como funciona no dia a dia

Depois que o monorepo estiver pronto, o fluxo normal fica assim:

### Para desenvolver

```bash
git pull
npm install
npm run dev
```

### Para versionar mudanças

```bash
git add .
git commit -m "feat: descrição da mudança"
git push
```

Agora existe um único repositório principal, então o push atualiza o projeto inteiro.

---

## 11) Troubleshooting

### Erro: `Missing script: "dev"`

Isso significa que o script `dev` não existe no `package.json` da raiz.

Verifique se o arquivo raiz tem:

```json
"scripts": {
  "dev": "concurrently \"npm run dev --workspace=frontend\" \"npm run dev --workspace=backend\""
}
```

### Erro: workspace não encontrado

Se o npm reclamar que não encontra o workspace, confira os nomes nos `package.json` internos.

Eles precisam bater com o script da raiz:

- `"name": "frontend"`
- `"name": "backend"`

### Erro do Prisma pedindo `prisma generate`

Rode dentro do backend:

```bash
cd apps/backend
npx prisma generate
```

---

## 12) Regra prática para não se complicar

Para esse projeto, mantenha simples:

- React no frontend
- Node + Express no backend
- Prisma no backend
- PostgreSQL no banco
- `concurrently` na raiz

Não complique com ferramentas demais cedo demais.

---

## Resumo final

### Uma vez só

- importar os repos com `git subtree`
- ajustar os `package.json`
- configurar `workspaces`
- instalar `concurrently`

### Depois, sempre

```bash
npm run dev
```

Pronto.

