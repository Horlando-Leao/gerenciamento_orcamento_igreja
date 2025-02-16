const fs = require('fs');
const path = require('path');

function readConfig() {
    try {
        const filePath = path.join(__dirname, 'config.json');
        const data = fs.readFileSync(filePath, 'utf8');
        const config = JSON.parse(data);
        return config;
    } catch (error) {
        console.error('Erro ao ler o arquivo JSON:', error);
        return null;
    }
}

const config = readConfig();

module.exports = { config }
