# API de Alunos - Exemplo para Aula

API REST simples desenvolvida em Node.js e Express para demonstração em aula e testes dos alunos.

## Endpoints

- `GET /` - Documentação da API
- `GET /api/alunos` - Lista todos os alunos
- `GET /api/alunos/:id` - Busca aluno por ID
- `POST /api/alunos` - Adiciona novo aluno (`{ "nome": "...", "curso": "..." }`)

## Como rodar localmente

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor:
   ```bash
   npm start
   ```
