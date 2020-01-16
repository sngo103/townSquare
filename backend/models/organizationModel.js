const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name:        String,
  description: String,
  imageURL:    String,
});

const organizationModel = new mongoose.model('Organization', organizationSchema);
module.exports = organizationModel;
