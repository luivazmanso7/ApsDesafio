import connection from "../db.js";

export async function criarCliente(cliente) {
  const {
    nome, cnpj, nome_fantasia, cep,
    logradouro, bairro, cidade, uf,
    complemento, email, telefone
  } = cliente;

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