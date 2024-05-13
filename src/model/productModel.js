  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;
  
  const ProductSchema = new Schema({
    product_name: String,
    description: String,
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    unit: String,
    quantity: Number,
    price: Number,
    discount: String, 
    images: [String],
    isActive: {
      type: Boolean,
      default: true
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    related_products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
  });
  
  module.exports = mongoose.model('Product', ProductSchema);