const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  mobile_no: String,
  isBlocked: {
    type: Boolean,
    default: false
  },
  address: [{ type: Schema.Types.ObjectId, ref: 'Address' }],
  coupons: [{ type: Schema.Types.ObjectId, ref: 'Coupon' }],
  googleId: String,
  facebookId: String,
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
