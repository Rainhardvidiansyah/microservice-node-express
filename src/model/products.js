const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName: String, 
    description: String, 
    price: Number, 
    createdAt: { type: Date, default: Date.now }
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;

/**
 product_name
 product_description
 price
 created_at
 */