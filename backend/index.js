const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const router = require('./router');

const PORT = 5000;
const app = express();

mongoose.connect('mongodb://localhost:27017/omni', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api', router);

// following code is for running frontend and backend on same port for prod
/*
 *let staticServe = express.static(path.join(__dirname, '../frontend/build'));
 *app.use("/", staticServe);
 *app.use("*", staticServe);
 */

app.listen(PORT, () => console.log(`Omni API running on port ${PORT}`));
