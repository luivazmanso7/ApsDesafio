import axios from 'axios';

const BASE_URL = 'http://localhost:3000/clientes';
const BASE_URL_CNPJ = 'https://publica.cnpj.ws/cnpj';
const BASE_URL_CEP = 'https://viacep.com.br/ws';

export async function getClientes() {
  const response = await axios.get(BASE_URL);
  return response.data;
}

export async function getCliente(id) { //especifico 
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
}

export async function criarCliente(dados) {
  const response = await axios.post(BASE_URL, dados);
  return response.data;
}

export async function atualizarCliente(id, dados) {
  const response = await axios.put(`${BASE_URL}/${id}`, dados);
  return response.data;
}

export async function deletarCliente(id) {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
}

export async function consultarCNPJ(cnpj) {
  const cleaned = cnpj.replace(/\D/g, '');
  const response = await axios.get(`${BASE_URL_CNPJ}/${cleaned}`);
  return response.data;
}

export async function consultarCEP(cep) {
  const cleanedCep = cep.replace(/\D/g, '');
  const response = await axios.get(`${BASE_URL_CEP}/${cleanedCep}/json`);
  return response.data;
}