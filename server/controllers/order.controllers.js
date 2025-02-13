import { tryCatch } from "../middlewares/error.js"
import { Order } from "../models/Order.model.js"
import { ErrorHandler } from '../util.js'

const getOrders = tryCatch(async (_, res) => {
    const orders = await Order.find({})
    const flattenedOrders = orders.map(({ user, items, totalAmount, status, paymentMethod, shippingAddress,createdAt }) => ({ ...user, ...shippingAddress, items, totalAmount, status, paymentMethod ,createdAt}))
    res.status(200).json({ success: true, orders: flattenedOrders, msg: 'Orders Fetched Successfully' })
})

const updateOrderStatus = tryCatch(async (req, res, next) => {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status })
    if (!order) return next(new ErrorHandler(404, 'Order Not Found'))
    res.status(200).json({ success: true, order, msg: 'Order Status updated Successfully' })
})

export { getOrders, updateOrderStatus }