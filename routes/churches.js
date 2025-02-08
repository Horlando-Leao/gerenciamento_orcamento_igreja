const express = require('express');
var router = express.Router();
const { Church } = require('../models'); // Importa o modelo

// Listar todas as igrejas
router.get('/churches', async (req, res) => {
    try {
        const churches = await Church.findAll();
        res.render('churches/index', { title: 'Lista de Igrejas', churches });
    } catch (error) {
        console.error('Erro ao buscar igrejas:', error);
        res.status(500).send('Erro ao carregar igrejas');
    }
});

// Detalhes de uma igreja
router.get('/churches/:id', async (req, res) => {
    try {
        const church = await Church.findByPk(req.params.id);
        if (!church) {
            return res.status(404).send('Igreja não encontrada');
        }
        res.render('churches/details', { title: `Detalhes de ${church.name}`, church });
    } catch (error) {
        console.error('Erro ao buscar detalhes da igreja:', error);
        res.status(500).send('Erro ao carregar detalhes');
    }
});

module.exports = router;
