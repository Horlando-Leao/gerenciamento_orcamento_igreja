var express = require('express');
var router = express.Router();
const { hasAuthMiddleware } = require('../../middlewares/hasAuthMiddleware');

// Rota para processar o login
router.get('/user/login', hasAuthMiddleware, async function(req, res) {
    res.render('login/views/login', {alertMessage: req.session.alertMessage});
});

module.exports = router;
