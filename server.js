const express = require('express'); // Importa o módulo Express
const path = require('path');     // Importa o módulo 'path' do Node.js para trabalhar com caminhos de arquivo
const app = express();            // Cria uma instância do aplicativo Express

// Configura o Express para servir arquivos estáticos da pasta 'public'
// Isso é essencial: quando alguém acessar seu site, o Express saberá
// onde encontrar seu index.html, e as pastas css/ e js/ dentro dela.
app.use(express.static(path.join(__dirname, 'public')));

// Define uma rota para o caminho raiz ('/')
// Quando alguém acessa a URL base do seu site (ex: http://localhost:3000 ou seu-site.com),
// este middleware envia o arquivo 'index.html' que está dentro da pasta 'public'.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define a porta em que o servidor irá escutar.
// process.env.PORT é uma variável de ambiente que muitos serviços de hospedagem
// (como Vercel, Netlify, Heroku) usam para informar ao seu aplicativo qual porta usar.
// Se essa variável não estiver definida (o que acontece quando você roda localmente),
// ele usará a porta 3000 como padrão.
const PORT = process.env.PORT || 3000;

// Inicia o servidor e o faz escutar na porta definida.
// Uma mensagem será exibida no console quando o servidor estiver pronto.
app.listen(PORT, () => {
    console.log(`Servidor Express rodando em http://localhost:${PORT}`);
    console.log('Para acessar fora da sua máquina, você precisará de um serviço de hospedagem.');
});