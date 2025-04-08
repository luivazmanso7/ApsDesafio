import { listClients, createCliente, updateCliente, deleteClient} from '../models/clienteModel.js';

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


export async function updateClienteController(req, res) {
  try {
    const { id } = req.params;
    const cliente = req.body;
    const updated = await updateCliente(id, cliente);
    
    if (updated) {
      res.status(200).json({ message: "Cliente atualizado com sucesso" });
    } else {
      res.status(404).json({ error: "Cliente não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o cliente" });
  }
}



export async function deleteClienteController(req, res) {
  const id = req.params.id;

  try {
    const sucess = await deleteClient(id);
    if (sucess) {
      res.status(200).json({ message: "Cliente deletado com sucesso" });
    } else {
      res.status(404).json({ error: "Cliente não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar cliente" });
  }
}