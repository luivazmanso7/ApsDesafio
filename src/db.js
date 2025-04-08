import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'suaSenhaAqui',
  database: process.env.DB_NAME || 'aps_clientes_db'
});

console.log('conectado ao MySQL');
export default connection;