const { roleUserEnum } = require("../../infra/database/models/enums/roleUser");


function hasAdministradorMiddle(req, res, next) {
    if (req.session.user.role !== roleUserEnum.ADMINISTRADOR) {
        throw new Error("Usuário não é administrador") 
    }
    next();
}

module.exports = { hasAdministradorMiddle };