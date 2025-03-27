var express = require('express');
var router = express.Router();
const { hasAuthMiddleware } = require("../../middlewares/hasAuthMiddleware");

/* GET home page. */
router.get('/', hasAuthMiddleware, function(req, res, next) {
  res.render('index', { title: 'Gestão Financeira IBLF' });
});

module.exports = router;
