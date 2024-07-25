const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
    username: { type: String, required: true, minlength: 6, maxlength: 20, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6  },
    phone: { type: String, required: true, unique: true  },
    cart: [{
        product: {type: mongoose.Types.ObjectId, ref: 'Product'},
        quantity: Number,
        color: String
    }],
    admin: { type: Boolean, default: false  },
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', User)