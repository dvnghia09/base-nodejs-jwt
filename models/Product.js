const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Product = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        slug: 'title',
        unique: true,
    },
    description: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'category'
    },
    quantity: {
        type: Number,
        default: 0,
        min: 0
    },
    images: {
        type: Array,
    },
    color: {
        type: String,
        enum: ['Black', 'Grown', 'Red']
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Product', Product)