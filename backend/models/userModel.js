const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fname:          String,
  lname:          String,
  email:          String,
  hashedPassword: String,
  location:       String,
  subscriptions:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }],
  memberships:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }],
});

const userModel = new mongoose.model('User', userSchema);
module.exports = userModel;
