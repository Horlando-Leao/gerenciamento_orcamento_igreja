const { exec } = require('child_process');
const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');

// Carregar configurações do Sequelize
const config = require('../config/config.json');
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig);

/**
 * Realiza o dump do banco de dados MySQL.
 * @param {string} [outputPath] - Caminho onde o dump será salvo (opcional).
 */
async function dumpDatabase(outputPath = null) {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao banco de dados!');

    const dumpPath = outputPath || path.join(__dirname, '..', 'backups', `backup_${dbConfig.database}_${Date.now()}.sql`);

    // Comando mysqldump
    const dumpCommand = `mysqldump -h ${dbConfig.host} -P ${dbConfig.port || 3306} -u${dbConfig.username} -p${dbConfig.password} ${dbConfig.database} > ${dumpPath}`;
    
    exec(dumpCommand, (error, stdout, stderr) => {
      if (error) {
        console.error('Erro ao gerar dump:', error);
        return;
      }
      console.log(`Dump do banco de dados salvo em: ${dumpPath}`);
    });
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
}

// Exemplo de uso
// dumpDatabase();

module.exports = { dumpDatabase };
