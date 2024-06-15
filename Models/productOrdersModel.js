const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const productOrderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    orderId: {
        type: String,
        default: function() {
            return uuidv4().replace(/-/g, '').slice(0, 6);
        }
    }
}, {
    timestamps: true
});

const ProductOrderModel = mongoose.model('ProductOrder', productOrderSchema);

module.exports = ProductOrderModel;