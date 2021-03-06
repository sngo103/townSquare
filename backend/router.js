const bodyParser = require('body-parser');
const express = require('express');
const expressSession = require('express-session');
const User = require('./models/userModel');
const Event = require('./models/eventModel');
const Organization = require('./models/organizationModel');
const { getUser, registerUser } = require('./auth');

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.use(expressSession({resave: false,
  saveUninitialized: true,
  secret: 'super secret security'}));

router.get('/', (req, res) => {
  console.log("Homepage")
  res.json('Town Square API');
});

function allExist(...items) {
  for (let i in items) {
    if (!items[i]) {
      return false;
    }
  }
  return true;
}

async function requireLogin(req, res, next) {
  if (!req.session.email) {
    res.json({success:false, message:'Must be logged in.'});
  } else {
    let user = await User.findOne({email: req.session.email});
    req.user = user;
    return next();
  }
}

// register user and store email in session if successful
router.post('/register', async (req, res) => {
  let { fname,
    lname,
    email,
    password,
    confirmPassword } = req.body;
  if (!allExist(fname,
    lname,
    email,
    password,
    confirmPassword)) {
    res.json({success:false, message:'Missing at least one field!'});
  } else if (password !== confirmPassword) {
    res.json({success:false, message:'Passwords do not match!'});
  } else {
    let success = await registerUser(fname, lname, email, password);
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
  } else if (!allExist(req.body.email, req.body.password)) {
    res.json({success:false, message:'Missing email or password!'});
  } else {
    let user = await getUser(req.body.email, req.body.password);
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

router.get('/events', requireLogin, async (req,res) => {
  let events = [];
  for (let i in req.user.subscriptions) {
    let org = req.user.subscriptions[i];
    let newEvents = await Event.find({organization:org});
    events = events.concat(newEvents);
  }
  res.json({success:true, events:events});
});

router.post('/subscribe', requireLogin, async (req, res) => {
  let orgName = req.body.name;
  if (!orgName) {
    res.json({success:false, message:'No organization specified.'});
  } else {
    let org = await Organization.findOne({name:orgName});
    if (!org) {
      res.json({success:false,
        message:'That organization does not exist.'});
    } else if(!org.isPublic && !req.user.memberships.includes(org.id)) {
      res.json({success:false,
        message:'That organization is not public.'});
    } else {
      if (req.user.subscriptions.includes(org.id)) {
        res.json({success:false,
          message:'You are already subscribed to that organization.'});
      } else {
        req.user.subscriptions.push(org);
        await req.user.save();
        res.json({success:true});
      }
    }
  }
});

router.post('/unsubscribe', requireLogin, async (req, res) => {
  let orgName = req.body.name;
  if (!orgName) {
    res.json({success:false, message:'No organization specified.'});
  } else {
    let org = await Organization.findOne({name:orgName});
    if (!org) {
      res.json({success:false,
        message:'That organization does not exist.'});
    } else {
      if (!req.user.subscriptions.includes(org.id)) {
        res.json({success:false,
          message:'You are not subscribed to that organization.'});
      } else {
        let orgIndex = req.user.subscriptions.indexOf(org.id);
        req.user.subscriptions.splice(orgIndex, 1);
        await req.user.save();
        res.json({success:true});
      }
    }
  }
});

router.post('/create/organization', requireLogin, async (req, res) => {
  let { name, description, isPublic } = req.body;
  if (!allExist(name, description, isPublic)) {
    res.json({success:false, message:'Missing at least one field!'});
  } else {
    let existingOrg = await Organization.findOne({name});
    if (existingOrg) {
      res.json({success:false, message:'An organization with that name already exists!'});
    } else {
      let org = Organization({name, description, isPublic, creator:req.user});
      await org.save();
      req.user.subscriptions.push(org);
      req.user.memberships.push(org);
      await req.user.save();
      res.json({success:true, message:'Successfully created organization.'});
    }
  }
});

router.post('/requestmembership', requireLogin, async (req, res) => {
  let orgName = req.body.name;
  if (!orgName) {
    res.json({success:false, message:'No organization specified.'});
  } else {
    let org = await Organization.findOne({name:orgName});
    if (!org) {
      res.json({success:false,
        message:'That organization does not exist.'});
    } else if(req.user.memberships.includes(org.id)) {
      res.json({success:false,
        message:'You are already a member of that organization.'});
    } else if(org.membershipRequests.includes(req.user.id)) {
      res.json({success:false,
        message:'You already requested membership for that organization.'});
    } else {
      org.membershipRequests.push(req.user);
      await org.save();
      res.json({success:true});
    }
  }
});

router.get('/membershiprequests/:orgName', requireLogin, async (req, res) => {
  let orgName = req.params.orgName;
  if (!orgName) {
    res.json({success:false, message:'No organization specified.'});
  } else {
    let org = await Organization.findOne({name:orgName})
      .populate('membershipRequests');
    if (!org) {
      res.json({success:false,
        message:'That organization does not exist.'});
    } else if(!org.creator.equals(req.user.id)) {
      res.json({success:false,
        message:'You are not the organization\'s creator'});
    } else {
      res.json({success:true,
        members:org.membershipRequests.map(m => m.username)});
    }
  }
});

router.post('/approvemembership', requireLogin, async (req, res) => {
  let { username, orgName } = req.body;
  if (!allExist(username, orgName)) {
    res.json({success:false, message:'Missing username or organization name.'});
  } else {
    let user = await User.findOne({username});
    let org = await Organization.findOne({name: orgName});
    if (!user) {
      res.json({success:false, message:'That user does not exist.'});
    } else if (!org) {
      res.json({success:false, message:'That organization does not exist.'});
    } else if (!org.creator.equals(req.user.id)) {
      res.json({success:false,
        message:'You are not the organization\'s creator.'});
    } else if (!org.membershipRequests.includes(user.id)) {
      res.json({success:false,
        message:'That user did not request membership.'});
    } else {
      user.memberships.push(org);
      await user.save();
      let requestIndex = org.membershipRequests.indexOf(user.id);
      org.membershipRequests.splice(requestIndex, 1);
      await org.save();
      res.json({success:true});
    }
  }
});

router.post('/create/event', requireLogin, async (req, res) => {
  let { name, location, time, description, organization } = req.body;
  if (!allExist(name, location, time, description, organization)) {
    res.json({success:false, message:'Missing at least one field!'});
  } else {
    let org = await Organization.findOne({name:organization});
    if (!org) {
      res.json({success:false, message:'That organization does not exist!'})
    } else if (!req.user.memberships.includes(org.id)) {
      res.json({success:false,
        message:'You are not a member of this organization!'})
    } else {
      let e = Event({ name, location, time, description, organization:org });
      await e.save();
      res.json({success:true, message:'Successfully created event.'});
    }
  }
});

module.exports = router;
