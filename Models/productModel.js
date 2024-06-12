const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        requiered: true,
    },
    inStock: {
        type: Boolean,
        default: true,
    },
    isFavorite: {
        type: Boolean,
        default: false,
        requiered: false
    },
    forBeginners: {
        type: Boolean,
        default: false,
        requiered: false
    },
    isPetSafe: {
        type: Boolean,
        default: false,
        requiered: false
    },
}, {
    timestamps: true 
})

const Product = mongoose.model('product', productSchema)

module.exports = Product

