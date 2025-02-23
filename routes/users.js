const express = require('express');
const router = express.Router();
const User = require('../models/user');
const UserConfig = require('../models/userConfig');

// Lista todos os usuários
router.get('/users/manage', async (req, res) => {
    try {
        const users = await User.findAll({
            include: UserConfig
        });
        res.render('users/index', { title: 'Usuários', users });
    } catch (error) {
        console.log(error)
        res.status(500).send('Erro ao buscar usuários');
    }
});

// Formulário para criar um novo usuário
router.get('/new', (req, res) => {
    res.render('users/new', { title: 'Novo Usuário' });
});

// Cria um novo usuário
router.post('/add', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        await User.create({ name, email, password });
        res.redirect('/users');
    } catch (error) {
        res.status(500).send('Erro ao criar usuário');
    }
});

// Formulário de edição de usuário
router.get('/edit/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        res.render('users/edit', { title: 'Editar Usuário', user });
    } catch (error) {
        res.status(500).send('Erro ao buscar usuário');
    }
});

// Atualiza um usuário
router.post('/update/:id', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        await User.update({ name, email, password }, { where: { id: req.params.id } });
        res.redirect('/users');
    } catch (error) {
        res.status(500).send('Erro ao atualizar usuário');
    }
});

// Deleta um usuário
router.post('/delete/:id', async (req, res) => {
    try {
        await User.destroy({ where: { id: req.params.id } });
        res.redirect('/users');
    } catch (error) {
        res.status(500).send('Erro ao deletar usuário');
    }
});

module.exports = router;
