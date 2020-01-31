const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const router = require('./router');

const PORT = process.env.PORT || 5000;
const app = express();

mongoose.connect('mongodb://localhost:27017/town-square', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api', router);

let startMessage = `Town Square API running on port ${PORT}`;

// following code is for running frontend and backend on same port for prod
if (process.env.DEPLOY === 'prod') {
  let staticServe = express.static(path.join(__dirname, '../frontend/build'));
  app.use("/", staticServe);
  app.use("*", staticServe);
  startMessage = `Town Square web app running on port ${PORT}`;
}

app.listen(PORT, () => console.log(startMessage));
