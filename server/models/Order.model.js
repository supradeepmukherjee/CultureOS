import mongoose, { model, Schema } from 'mongoose'

const OrderSchema = new Schema(
    {
        user: {
            fullName: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true },
        },
        items: [
            {
                product: {
                    name: { type: String, required: true },
                    description: { type: String },
                    price: { type: Number, required: true },
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
            },
        ],
        totalAmount: {
            type: Number,
            required: true,
            default: 0,
        },
        status: {
            type: String,
            enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
            default: 'Pending',
        },
        paymentMethod: {
            type: String,
            enum: ['Credit Card', 'Debit Card', 'PayPal', 'Cash on Delivery'],
            required: true,
        },
        shippingAddress: {
            fullName: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
)

OrderSchema.pre('save', function (next) {
    this.totalAmount = this.items.reduce((sum, item) => sum + item.quantity * item.product.price, 0)
    next()
})


export const Order = mongoose.models.CultureOsOrder || model('CultureOsOrder', OrderSchema) //  I am naming it CultureOsOrder because another model named 'User' is already in use.