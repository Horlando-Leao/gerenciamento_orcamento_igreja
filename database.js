const { Sequelize } = require('sequelize');
const mysql = require('mysql2');
const config = require('./config/config.json');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

function initializeDatabase() {
    try {
        
        const pool = mysql.createPool({
            host: dbConfig.host,
            user: dbConfig.username,
            password: dbConfig.password,
            port: dbConfig.port || 3306,
            connectionLimit: 5
        });

        pool.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\`;`, (error) => {
            if (error) {
                console.error('❌ Erro ao criar o banco de dados:', error);
                process.exit(1);
            } else {
                console.log(`✅ Banco de dados '${dbConfig.database}' pronto para uso.`);
            }

            pool.end((err) => {
                if (err) {
                    console.error('❌ Erro ao fechar a conexão do pool:', err);
                } else {
                    console.log('✅ Pool de conexões fechado.');
                }
            });
        });

        const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
            host: dbConfig.host,
            dialect: dbConfig.dialect,
            port: dbConfig.port || 3306,
            dialectOptions: dbConfig.dialectOptions || {},
            logging: false
        });

        return sequelize;
    } catch (error) {
        console.error('❌ Erro ao inicializar o banco de dados:', error);
        process.exit(1);
    }
}

module.exports = initializeDatabase();
