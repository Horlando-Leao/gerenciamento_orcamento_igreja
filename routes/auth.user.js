var express = require('express');
var router = express.Router();

const { User } = require('../models'); // Importa o modelo de usuário

// Rota para processar o login
router.post('/user/auth', async function(req, res) {
    const { email, password } = req.body;

    // Simulação de autenticação (ajuste para adicionar senha real)
    const user = await User.findOne({ where: { email, password } });

    if (user) {
        res.send(`Bem-vindo, ${user.name}!`); // Autenticação simples (sem senha)
    } else {
        res.send('Usuário não encontrado!');
    }
});

module.exports = router;
