const express = require('express');
const router = express.Router();
const { ChurchRevenue, Church } = require('../../../models');
const { authMiddleware } = require('../../middlewares/authMiddleware.js');
const { roleUserEnum } = require('../../../models/enums/roleUser.js');
const { Op, Sequelize } = require('sequelize');

router.get('/revenues/:churchId', authMiddleware, async (req, res) => {
    try {
        const churchId = req.params.churchId;
        const { month, year } = req.query;

        // Verifica se o usuário tem permissão para acessar a igreja
        if (req.session.user.role === roleUserEnum.ADMINISTRADOR) {
            /** pass */
        } else if (req.session.user.churchsId.split(",").includes(churchId)) {
            /** pass */
        } else {
            throw new Error(`Usuário não é administrador e nem tem acesso ao id da igreja ${churchId}`);
        }

        // Define o mês e ano atual se não forem fornecidos
        const currentDate = new Date();
        const currentMonth = month ? parseInt(month) : currentDate.getMonth() + 1; // Mês atual (1-12)
        const currentYear = year ? parseInt(year) : currentDate.getFullYear(); // Ano atual

        // Filtra as receitas pelo mês e ano usando strftime do SQLite
        const revenues = await ChurchRevenue.findAll({
            include: Church,
            where: {
                churchId,
                [Op.and]: [
                    Sequelize.where(Sequelize.fn('strftime', '%m', Sequelize.col('date')), String(currentMonth).padStart(2, '0')),
                    Sequelize.where(Sequelize.fn('strftime', '%Y', Sequelize.col('date')), String(currentYear))
                ]
            }
        });

        const church = await Church.findByPk(churchId);

        res.render('revenues/index', {
            title: 'Receitas das Igrejas',
            revenues,
            church,
            user: req.session.user,
            currentMonth,
            currentYear
        });
    } catch (error) {
        res.status(500).send(`Erro ao carregar receitas: ${error}`);
    }
});


// Rota para adicionar uma nova receita
router.post('/revenues/add', authMiddleware, async (req, res) => {
    try {
        const { churchId, date, amount, type, description } = req.body;
        const userId = req.session.user.id
        // Cria a receita no banco de dados
        await ChurchRevenue.create({
            churchId,
            date,
            amount,
            userId,
            type,
            description
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
        const { date, amount, type, description} = req.body;

        // Busca a receita pelo ID
        const revenue = await ChurchRevenue.findByPk(id);

        if (!revenue) {
            return res.status(404).send('Receita não encontrada');
        }

        // Atualiza os dados da receita
        await revenue.update({
            date,
            amount,
            type,
            description
        });

        // Redireciona para a página de receitas da igreja após a atualização
        res.redirect(`/revenues/${revenue.churchId}`);
    } catch (error) {
        console.error('Erro ao atualizar receita:', error);
        res.status(500).send('Erro ao atualizar receita.');
    }
});


module.exports = router;
