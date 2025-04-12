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


export async function updateCliente(id, cliente) {
  const connection = await getConnection();
  const {
    nome, cnpj, nome_fantasia, cep,
    logradouro, bairro, cidade, uf,
    complemento, email, telefone
  } = cliente;

  const [result] = await connection.execute(`
    UPDATE clientes SET
      nome = ?, cnpj = ?, nome_fantasia = ?, cep = ?,
      logradouro = ?, bairro = ?, cidade = ?, uf = ?,
      complemento = ?, email = ?, telefone = ?
    WHERE id = ?
  `, [
    nome, cnpj, nome_fantasia, cep,
    logradouro, bairro, cidade, uf,
    complemento, email, telefone,
    id
  ]);

  return result.affectedRows;
}



export async function deleteClient(id) {
  const connection = await getConnection();
  const [result] = await connection.execute(`
    DELETE FROM clientes WHERE id = ?
  `, [id]);

  return result.affectedRows > 0; // retorna true 
}


export async function getCliente(id) {
  const connection = await getConnection();
  const [rows] = await connection.execute('SELECT * FROM clientes WHERE id = ?', [id]);
  return rows[0];
}


  
