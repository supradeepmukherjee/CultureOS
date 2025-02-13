import { body, param, validationResult } from 'express-validator'
import { ErrorHandler } from '../util.js'
import mongoose from 'mongoose'

const validationHandler = (req, _, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) next()
    else next(new ErrorHandler(400, errors.array().map(({ msg }) => msg).join(', ')))
}

const orderStatusValidator = () => [
    param('id', 'Please Enter Menu Order ID').notEmpty().custom(val => {
        if (!mongoose.Types.ObjectId.isValid(val)) return false
        return true
    }).withMessage('Invalid Item ID'),
    body('status').isIn(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']).withMessage('Invalid Status of Order')
]

export { validationHandler, orderStatusValidator }
