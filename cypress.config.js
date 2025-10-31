const { defineConfig } = require('cypress');
const { Pool } = require('pg');
const dotenv = require('dotenv'); 

// 1. CARREGA O ARQUIVO .env ANTES DE TUDO
// Esta é a única forma correta de ler o .env no Node.js
dotenv.config(); 

// 2. Configuração do Banco de Dados lida de forma segura
const dbConfig = {
    // Process.env é usado para ler as variáveis injetadas
    DB_HOST: process.env.DB_HOST,
    DB_PORT: parseInt(process.env.DB_PORT, 10), // Garante que é um número
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD
};

// 3. Criação do Pool de Conexões
const pool = new Pool({
    user: dbConfig.DB_USER,
    host: dbConfig.DB_HOST,
    database: dbConfig.DB_NAME,
    password: dbConfig.DB_PASSWORD,
    port: dbConfig.DB_PORT,
    ssl: { 
        rejectUnauthorized: false 
    }
});

// 4. Função que executa a Query
async function queryDb(query) {
    const client = await pool.connect();
    try {
        const res = await client.query(query);
        return res.rows; 
    } catch (err) {
        console.error('⚠️ ERRO ao executar query no DB (Verifique Conexão/Credenciais/Security Group):', err.stack);
        throw err;
    } finally {
        client.release(); 
    }
}

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://dev.zionglobal.app',
    experimentalSessionAndOrigin: false,
    
    // 5. Configuração das Tasks
    setupNodeEvents(on, config) {
      on('task', {
        sqlQuery(query) {
          return queryDb(query);
        },
      });

      return config;
    },
  },
  fixturesFolder: 'cypress/fixtures',
  video: false,
});