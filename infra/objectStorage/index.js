const fs = require('fs');
const { HttpClient } = require('../httpClient');

class ObjectStorage {
    constructor() {
        this.url = "https://objectstorage.us-ashburn-1.oraclecloud.com/p/J4AHfGiLKnqV1fFVN01nHh3hyJNJQQZZnymhBJnvoHAsH_UagBgrJEjJCHhbdSqV/n/iduzjsw5u00v/b/bucket-mysql-dump-iblf/o/";  
    }

    async upload(filePath = '') {
        try {
            const file = fs.readFileSync(filePath);

            const response = await HttpClient.put(this.url, file, {
                headers: {
                    'Content-Type': 'application/octet-stream',
                }
            });

            if (response.status === 200) {
                console.log('Upload bem-sucedido!');
            } else {
                console.log(`Erro no upload: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error('Erro ao realizar o upload:', error.message);
        }
    }
}


module.exports = { objectStorage: new ObjectStorage() }