const { cronManager } = require("../infra/cronManager/index");

cronManager.addJob("teste", "0 0 * * *", () => console.log("Teste de cron"), false)
cronManager.startJob("teste")

console.log("Todas as cron em execução: ", cronManager.listJobsRunning());

// importar dentro do app
module.exports = { initCronManager: () => console.log("Cron manage iniciado!") }
