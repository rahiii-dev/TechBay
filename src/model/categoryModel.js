const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: String,
  description: String,
  image: String,
  isActive : {
    type : Boolean,
    default : true
  }
});

module.exports = mongoose.model('Category', CategorySchema);