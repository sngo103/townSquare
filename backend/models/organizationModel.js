const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name:               String,
  description:        String,
  imageURL:           String,
  creator:            { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isPublic:           Boolean,
  membershipRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const organizationModel = new mongoose.model('Organization', organizationSchema);
module.exports = organizationModel;
