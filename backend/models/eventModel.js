const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name:         String,
  location:     String,
  time:         Date,
  description:  String,
  imageURL:     String,
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
});

const eventModel = new mongoose.model('Event', eventSchema);
module.exports = eventModel;
