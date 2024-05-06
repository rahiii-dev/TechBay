const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  mobile_no: {
    type: String
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  address: [{
    type: Array
  }],
  coupons: [{
    type: Array
  }]
}, {timestamps : true});