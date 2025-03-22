const express = require('express');
const router = express.Router();
const User = require('../../../models/user');
const Church = require('../../../models/church');
const UserConfig = require('../../../models/userConfig');
const { gerarSenha } = require("../helpers/gerarSenha");
const { ChurchIdTranformer } = require("../transformers/churchsIds");
const { hasAdministradorMiddle } = require('../middlewares/hasAdministradorMiddle');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Lista todos os usuários  
router.get('/users/manage', authMiddleware, hasAdministradorMiddle, async (req, res) => {
    try {
        const users = await User.findAll({
            include: UserConfig
        });
        
        const churches = await Church.findAll({ attributes: ['id', 'name'] });
        const novaSenhaAlerta = req.session.novaSenhaAlerta;
        req.session.novaSenhaAlerta = null;
        res.render('users/index', { title: 'Usuários', users, user: req.session.user, novaSenhaAlerta, churches });
    } catch (error) {
        console.log(error)
        res.status(500).send('Erro ao buscar usuários');
    }
});

// Cria um novo usuário
router.post('/users/add', authMiddleware,  hasAdministradorMiddle, async (req, res) => {
    try {
        const { name, email, password, role, churchsId } = req.body;
        const newUser = await User.create({ name, email, password });
        UserConfig.create({ userId: newUser.dataValues.id, role, churchsId: ChurchIdTranformer.toDatabase(churchsId) })
        res.redirect('/users/manage');
    } catch (error) {
        res.status(500).send('Erro ao criar usuário');
    }
});

// Atualiza um usuário
router.post('/users/update/:id', authMiddleware, hasAdministradorMiddle, async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email, password, role, editChurchsId } = req.body;

        await User.update({ name, email, password }, { where: { id: userId } });
        await UserConfig.update({ role, churchsId: ChurchIdTranformer.toDatabase(editChurchsId) }, { where: { userId: userId } });
        res.redirect('/users/manage');
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao atualizar usuário');
    }
});

// Resetar senha
router.get('/users/reset-auth', authMiddleware, hasAdministradorMiddle, async (req, res) => {
    try {
        const email  = req.query.email;
        const response = await User.findOne({ where: { email: email } });
        const novaSenha = gerarSenha();
        req.session.novaSenhaAlerta = `Usuário: ${email} | Nova senha: ${novaSenha}`
        await User.update({ password:novaSenha }, { where: { id: response.dataValues.id } });
        // codigo que enviar o email
        
        res.redirect('/users/manage');
    } catch (error) {
        res.status(500).send('Erro ao atualizar usuário');
    }
});

module.exports = router;
