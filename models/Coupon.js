const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const Coupon = new Schema({
    name: {
        type: String,
        required: true,
        unique: [true, "This Coupon already exists, please try again"]
    },
    code: {
        type: String,
        required: true,
        unique: [true, "This Coupon already exists, please try again"]
    },
    discount: {
        type: Number,
        required: true,
    },
    expiry: {
        type: Date,
        required: true,
    }
    
}, {
    timestamps: true,
});

module.exports = mongoose.model('Coupon', Coupon)