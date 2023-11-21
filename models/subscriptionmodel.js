const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const subscriptionSchema = new mongoose.Schema({
  plan: String,
  user: String,
  timestamp: { type: Date, default: Date.now },
});



const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;

