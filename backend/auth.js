const bcrypt = require('bcrypt');
const User = require('./models/userModel');

// get user object based on credentials
async function getUser(email, password) {
  let user = await User.findOne({email});
  if (user && bcrypt.compareSync(password, user.hashedPassword)) {
    return user;
  }
  return null;
}

// try to register user and return whether it was successful or not
async function registerUser(fname, lname, email, password) {
  let existingUser = await User.findOne({email});
  if (existingUser) {
    return false;
  } else {
    let hashedPassword = bcrypt.hashSync(password, 10);
    let user = User({fname, lname, email, hashedPassword});
    await user.save();
    return true;
  }
}

module.exports = {getUser, registerUser};
