export function hasAuthMiddleware(req, res, next) {
    if (req.session.user) {
        return res.redirect('/churches');
    }
    next();
}
