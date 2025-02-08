const express = require('express');
const router = express.Router();
const { ChurchRevenue, Church } = require('../models');

// Listar receitas de todas as igrejas
router.get('/revenues/:churchId', async (req, res) => {
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

module.exports = router;
