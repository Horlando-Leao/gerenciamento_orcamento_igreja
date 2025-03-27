const express = require('express');
var router = express.Router();
const { Church } = require('../../../models');
const { authMiddleware } = require('../../middlewares/authMiddleware.js');
const { roleUserEnum } = require('../../../models/enums/roleUser.js');
const { ChurchIdTranformer } = require('../../transformers/churchsIds.js');
const { Op } = require('sequelize');

// Listar todas as igrejas
router.get('/churches', authMiddleware, async (req, res) => {
    try {

        let churches;
        if(req.session.user.role === roleUserEnum.ADMINISTRADOR){
            churches = await Church.findAll();
        }else if (req.session.user.role === roleUserEnum.DIRIGENTE_IGREJA){
            churches = await Church.findAll({
                where: {
                    id: { // O campo correto da tabela `Church` é `id`, não `churchsId`
                        [Op.in]: ChurchIdTranformer.toSearch(req.session.user.churchsId)
                    }
                }
            });
        } else {
            throw new Error("Tipo de usuario não encontrado");
        }
        
        res.render('church/views/index', { title: 'Lista de Igrejas', churches, user:  req.session.user });
    } catch (error) {
        console.error('Erro ao buscar igrejas:', error);
        res.status(500).send('Erro ao carregar igrejas');
    }
});

router.post('/churches/add', authMiddleware, async (req, res) => {
    try {
        const { name, address, city, state, phone, email } = req.body;

        // Cria a igreja no banco de dados
        await Church.create({
            name,
            address,
            city,
            state,
            country: 'Brasil', // Definido como padrão
            phone,
            email
        });

        // Redireciona para a lista de igrejas após o cadastro
        res.redirect('/churches');
    } catch (error) {
        console.error('Erro ao adicionar igreja:', error);
        res.status(500).send('Erro ao adicionar igreja.');
    }
});


// Atualizar uma igreja existente
router.post('/churches/update/:id', authMiddleware, async (req, res) => {
    try {
        const { id, name, address, city, state, phone, email } = req.body;

        // Busca a igreja pelo ID
        const church = await Church.findByPk(id);

        if (!church) {
            return res.status(404).send('Igreja não encontrada');
        }

        // Atualiza os dados da igreja
        await church.update({
            name,
            address,
            city,
            state,
            phone,
            email
        });

        // Redireciona para a lista de igrejas após a atualização
        res.redirect('/churches');
    } catch (error) {
        console.error('Erro ao atualizar igreja:', error);
        res.status(500).send('Erro ao atualizar igreja.');
    }
});


module.exports = router;
