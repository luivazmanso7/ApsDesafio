import { listClients, createCliente } from '../models/clienteModel.js';

export async function listClientesController(req,res) {
    try {
        const client = await listClients()
        res.status(200).json(client)
    } catch (error) {
        res.status(500).json({error: 'Erro ao listar os clientes'})
    }
    
}

export async function createClienteController(req,res) {
    try {
        const cliente = req.body;
        const insertId = await createCliente(cliente);
        res.status(201).json({ message: "cadastrado com sucesso", id: insertId });
    } catch (error) {
        console.error("Erro ao cadastrar:", error); // Adicione isso
        res.status(500).json({ error: "Erro ao cadastrar cliente" });
    }
    
}