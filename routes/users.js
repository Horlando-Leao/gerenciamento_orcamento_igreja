const express = require('express');
const router = express.Router();
const User = require('../models/user');
const UserConfig = require('../models/userConfig');
const { gerarSenha } = require("../helpers/gerarSenha");


// Lista todos os usuários
router.get('/users/manage', async (req, res) => {
    try {
        const users = await User.findAll({
            include: UserConfig
        });
        res.render('users/index', { title: 'Usuários', users, user: { name: req.session.user.name } });
    } catch (error) {
        console.log(error)
        res.status(500).send('Erro ao buscar usuários');
    }
});

// Cria um novo usuário
router.post('/users/add', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        await User.create({ name, email, password });
        res.redirect('/users/manage');
    } catch (error) {
        res.status(500).send('Erro ao criar usuário');
    }
});

// Atualiza um usuário
router.post('/users/update/:id', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        await User.update({ name, email, password }, { where: { id: req.params.id } });
        res.redirect('/users/manage');
    } catch (error) {
        res.status(500).send('Erro ao atualizar usuário');
    }
});

// Resetar senha
router.post('/users/reset-auth/:id', async (req, res) => {
    try {
        const { email } = req.body;
        const response = await User.findOne({ where: { email: email } });
        response;
    
        // codigo que enviar o email
        
        res.redirect('/users/manage');
    } catch (error) {
        res.status(500).send('Erro ao atualizar usuário');
    }
});

// Deleta um usuário
// router.post('/users/delete/:id', async (req, res) => {
//     try {
//         await User.destroy({ where: { id: req.params.id } });
//         res.redirect('/users');
//     } catch (error) {
//         res.status(500).send('Erro ao deletar usuário');
//     }
// });

module.exports = router;
