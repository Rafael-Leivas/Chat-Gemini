const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Inicializando a API do Gemini
const chaveAPI = new GoogleGenerativeAI('AIzaSyCK2OuGBxXGyyje5P201VptjVdWPstdAlw');

// Configurando o servidor
const app = express();

// Configura o CORS para permitir qualquer origem (qualquer domínio)
app.use(cors({
  origin: '*',  // Permite qualquer origem
  methods: ['GET', 'POST'],  // Permite os métodos GET e POST
  allowedHeaders: ['Content-Type'],  // Permite o cabeçalho Content-Type
}));

// Middleware para JSON e arquivos estáticos
app.use(express.json());
app.use(express.static('public'));  // Servir arquivos estáticos da pasta "public"

// Endpoint para enviar mensagens e obter resposta da Gemini
app.post('/send-message', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const model = chaveAPI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = userMessage;

    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    // Retornar a resposta do modelo Gemini
    res.json({ response: responseText });
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    res.status(500).json({ error: 'Erro ao se comunicar com a API Gemini' });
  }
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});