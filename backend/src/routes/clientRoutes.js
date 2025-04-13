import express from 'express'
import { createClienteController, listClientesController, updateClienteController, deleteClienteController, getClienteController } from '../controllers/clientController.js'

const router = express.Router()

router.get('/clientes', listClientesController)
router.get('/clientes/:id', getClienteController); //cliente especifico 
router.post('/clientes',createClienteController)
router.put('/clientes/:id', updateClienteController);
router.delete('/clientes/:id', deleteClienteController);


export default router