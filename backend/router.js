const bodyParser = require('body-parser');
const express = require('express');
const expressSession = require('express-session');
const User = require('./models/userModel');
const { getUser, registerUser } = require('./auth');

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.use(expressSession({resave: false,
  saveUninitialized: true,
  secret: 'super secret security'}));

router.get('/', (req, res) => {
  res.json('Omni API');
});

function allExist(...items) {
  for (let i in items) {
    if (!items[i]) {
      return false;
    }
  }
  return true;
}

// register user and store email in session if successful
router.post('/register', async (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;
  let confirmPassword = req.body.confirmPassword ;
  if (!allExist(email, username, password, confirmPassword)) {
    res.json({success:false, message:'Missing email, username, or password!'});
  } else if (password !== confirmPassword) {
    res.json({success:false, message:'Passwords do not match!'});
  } else {
    let success = await registerUser(email, username, password);
    if (!success) {
      res.json({success:true, message:'Failed to register user!'});
    } else {
      req.session.email = email;
      res.json({success:true, message:'Successfully registered user!'});
    }
  }
});

// login user and store email in session if successful
router.post('/login', async (req, res) => {
  if (req.session.email) {
    res.json({success:true, message:'Already logged in!'});
  } else if (!allExist(req.body.username, req.body.password)) {
    res.json({success:false, message:'Missing username or password!'});
  } else {
    let user = await getUser(req.body.username, req.body.password);
    if (user) {
      req.session.email = user.email;
      res.json({success:true, message:'Successfully authenticated user.'})
    } else {
      res.json({success:false, message:'Failed to authenticate user.'})
    }
  }
});

// destroy session regardless of login status
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({success: true});
});

module.exports = router;
