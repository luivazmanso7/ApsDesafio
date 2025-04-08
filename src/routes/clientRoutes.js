import express from 'express'
import { createClienteController, listClientesController, updateClienteController, deleteClienteController } from '../controllers/clientController.js'

const router = express.Router()

router.get('/clientes', listClientesController)
router.post('/clientes',createClienteController)
router.put('/clientes/:id', updateClienteController);
router.delete('/clientes/:id', deleteClienteController);


export default router