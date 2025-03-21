const path = require('path');
const { removeAllFiles } = require("../helpers/removeAllFiles");
const { cronManager } = require("../infra/cronManager/index");
const { objectStorage } = require("../infra/objectStorage/index");
const { config } = require('../config/config');

const taskBackup = () => {
    const dumpFolder =  path.join(__dirname, '..', 'backups');
    const dumpFile =  path.join(dumpFolder, `backup_${config.database}_${Date.now()}.sql`);

    cronManager.addJob("apagar-todos-backups", "0 0 * * *", () => removeAllFiles(dumpFolder), false)
    cronManager.addJob("salvar-backup-mysql", "0 2 * * *", () => objectStorage.upload(dumpFile))

    // cronManager.startJob("apagar-todos-backups");
    // cronManager.startJob("gerar-backup-mysql");
    // cronManager.startJob("salvar-backup-mysql");
}
taskBackup()

console.log("Todas as cron em execução: ", cronManager.listJobsRunning());

// importar dentro do app
module.exports = { initCronManager: () => console.log("Cron manage iniciado!") }
