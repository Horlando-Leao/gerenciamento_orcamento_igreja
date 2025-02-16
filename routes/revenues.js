const express = require('express');
const router = express.Router();
const { ChurchRevenue, Church } = require('../models');
const { authMiddleware  } = require("../middlewares/authMiddleware.js")

// Listar receitas de todas as igrejas
router.get('/revenues/:churchId', authMiddleware, async (req, res) => {
    try {
        const churchId = req.params.churchId;
        const revenues = await ChurchRevenue.findAll({ include: Church, where: { churchId } });
        const church = await Church.findByPk(churchId);
        
        res.render('revenues/index', { title: 'Receitas das Igrejas', revenues, church });
    } catch (error) {
        console.error('Erro ao buscar receitas:', error);
        res.status(500).send('Erro ao carregar receitas');
    }
});

// Rota para adicionar uma nova receita
router.post('/revenues/add', authMiddleware, async (req, res) => {
    try {
        const { churchId, date, amount } = req.body;
        const userId = req.session.user.id
        // Cria a receita no banco de dados
        await ChurchRevenue.create({
            churchId,
            date,
            amount,
            userId
        });

        // Redireciona para a página de receitas da igreja
        res.redirect(`/revenues/${churchId}`);
    } catch (error) {
        console.error('Erro ao adicionar receita:', error);
        res.status(500).send('Erro ao adicionar receita.');
    }
});


// Atualizar uma receita existente
router.post('/revenues/update/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { date, amount } = req.body;

        // Busca a receita pelo ID
        const revenue = await ChurchRevenue.findByPk(id);

        if (!revenue) {
            return res.status(404).send('Receita não encontrada');
        }

        // Atualiza os dados da receita
        await revenue.update({
            date,
            amount
        });

        // Redireciona para a página de receitas da igreja após a atualização
        res.redirect(`/revenues/${revenue.churchId}`);
    } catch (error) {
        console.error('Erro ao atualizar receita:', error);
        res.status(500).send('Erro ao atualizar receita.');
    }
});


module.exports = router;
