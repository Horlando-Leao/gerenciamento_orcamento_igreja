var express = require('express');
var router = express.Router();

// Rota para processar o login
router.get('/user/login', async function(req, res) {
    res.render('login', {});
});

module.exports = router;
