import express from 'express'
import { createClienteController, listClientesController } from '../controllers/clientController.js'

const router = express.Router()

router.get('/clientes', listClientesController)
router.post('/clientes',createClienteController)



export default router