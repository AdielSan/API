const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Libera acesso para requisições frontend/mobile
app.use(express.json());

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

// POST /api/alunos - Adicionar novo aluno
app.post('/api/alunos', (req, res) => {
  const { nome, curso } = req.body;

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

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// No final do server.js (mantendo o app.listen para desenvolvimento local)
app.listen(PORT, () => {
  console.log(`Servidor a rodar na porta ${PORT}`);
});

module.exports = app;
