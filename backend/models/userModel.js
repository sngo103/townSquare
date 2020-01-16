const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email:          String,
  username:       String,
  hashedPassword: String,
  location:       String,
  subscriptions:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }],
});

const userModel = new mongoose.model('User', userSchema);
module.exports = userModel;
