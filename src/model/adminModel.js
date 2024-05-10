const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  mobile_no: String,
}, { timestamps: true });

module.exports = mongoose.model('Admin', UserSchema);