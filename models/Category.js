const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);


const Category = new Schema({
    name: {
        type: String,
        required: true,
        unique: [true, "This category already exists, please try again"]
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true,
    },
    
}, {
    timestamps: true,
});

module.exports = mongoose.model('Category', Category)