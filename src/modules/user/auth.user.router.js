const express = require('express');
const router = express.Router();
const { User } = require('../../../models');
const { UserConfig } = require('../../../models');

// Rota para processar o login
router.post('/user/auth', async function(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email, password } });

        if (!user) {
            return res.status(401).send("Usuário não encontrado!");
        }
        
        const userConfig = await UserConfig.findOne({ where: { userId: user.id } })

        // Armazena os dados do usuário na sessão
        req.session.user = { id: user.id, name: user.name, email: user.email, role: userConfig.role, churchsId: userConfig.churchsId };
        req.session.alertMessage =null;
         
        res.redirect('/churches');
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro interno no servidor");
    }
});

// Rota para logout
router.get('/user/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/user/login');
    });
});

module.exports = router;
