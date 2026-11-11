const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Banco de dados em memória (lista inicial de alunos)
let alunos = [
  { id: 1, nome: "Ana Silva", curso: "Engenharia de Software", ativo: true },
  { id: 2, nome: "Bruno Costa", curso: "Sistemas de Informação", ativo: true },
  { id: 3, nome: "Carla Souza", curso: "Ciência da Computação", ativo: false }
];

// Rota raiz - Documentação rápida da API
app.get('/', (req, res) => {
  res.json({
    mensagem: "API de Alunos - Turma Web/Mobile",
    endpoints: {
      "GET /api/alunos": "Retorna todos os alunos",
      "GET /api/alunos/:id": "Retorna um aluno específico pelo ID",
      "POST /api/alunos": "Cadastra um novo aluno { nome, curso }"
    }
  });
});

// GET /api/alunos - Listar todos os alunos
app.get('/api/alunos', (req, res) => {
  res.status(200).json({
    total: alunos.length,
    dados: alunos
  });
});

// GET /api/alunos/:id - Buscar aluno por ID
app.get('/api/alunos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const aluno = alunos.find(a => a.id === id);

  if (!aluno) {
    return res.status(404).json({ erro: "Aluno não encontrado." });
  }

  res.status(200).json(aluno);
});

// POST /api/alunos - Adicionar novo aluno (com tratamento flexível para Vercel/Serverless)
app.post('/api/alunos', (req, res) => {
  let body = req.body;

  // Trata o corpo caso chegue como string em requisições serverless
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      return res.status(400).json({ erro: "Formato JSON inválido no corpo da requisição." });
    }
  }

  const { nome, curso } = body || {};

  if (!nome || !curso) {
    return res.status(400).json({ erro: "Campos 'nome' e 'curso' são obrigatórios." });
  }

  const novoAluno = {
    id: alunos.length + 1,
    nome,
    curso,
    ativo: true
  };

  alunos.push(novoAluno);
  res.status(201).json({ mensagem: "Aluno cadastrado com sucesso!", aluno: novoAluno });
});

// Inicialização local
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Exportação para suporte às funções Serverless do Vercel
module.exports = app;
