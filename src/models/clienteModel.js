import { getConnection } from "../db.js";

export async function createCliente(client) {
  const connection = await getConnection();
  const {
    nome, cnpj, nome_fantasia, cep,
    logradouro, bairro, cidade, uf,
    complemento, email, telefone
  } = client;

  const [result] = await connection.execute(`
    INSERT INTO clientes (
      nome, cnpj, nome_fantasia, cep,
      logradouro, bairro, cidade, uf,
      complemento, email, telefone
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    nome, cnpj, nome_fantasia, cep,
    logradouro, bairro, cidade, uf,
    complemento, email, telefone
  ]);

  return result.insertId;
}


export async function listClients() {
  const connection = await getConnection();
  const [rows] = await connection.execute('SELECT * FROM clientes');
  return rows;
}

