function authMiddleware(req, res, next) {
    if (!req.session.user) {
        req.session.alertMessage = "Você não está logado para acessar essa página, primeiro faça login";
        return res.redirect('/user/login');
    }
    next();
}

module.exports = { authMiddleware };
