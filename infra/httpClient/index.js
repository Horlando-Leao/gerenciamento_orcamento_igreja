const fetch = require('node-fetch');

class HttpClient {

    static async request(method, url, body = null, headers = {}) {
        try {

            const options = {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                },
                body: body ? JSON.stringify(body) : null,
            };

            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {

            console.error(`Erro ao fazer requisição para ${url}:`, error.message);
            throw error;
        }
    }


    static async get(url, headers = {}) {
        return this.request('GET', url, null, headers);
    }

    static async post(url, body, headers = {}) {
        return this.request('POST', url, body, headers);
    }

    static async put(url, body, headers = {}) {
        return this.request('PUT', url, body, headers);
    }

    static async delete(url, headers = {}) {
        return this.request('DELETE', url, null, headers);
    }
}

module.exports = { HttpClient }