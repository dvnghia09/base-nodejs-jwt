const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const Order = new Schema({
    product: [{
        product: {type: mongoose.Types.ObjectId, ref: "Product"},
        count: Number,
        color: String
    }],
    status: {
        type: String,
        default: 'Processing',
        enum: ['Cancelled', 'Processing', 'Successed']
    },
    paymentIntent: {},
    phone: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
    
}, {
    timestamps: true,
});

module.exports = mongoose.model('Order', Order)