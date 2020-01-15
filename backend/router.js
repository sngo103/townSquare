const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json('Omni API');
});

module.exports = router;
