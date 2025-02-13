import { Router } from 'express'
import { orderStatusValidator, validationHandler,  } from '../lib/validators.js'
import { getOrders, updateOrderStatus } from '../controllers/order.controllers.js'

const app = Router()

app.get('/', getOrders)
app.put('/:id', orderStatusValidator(), validationHandler, updateOrderStatus)

export default app