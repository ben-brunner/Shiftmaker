var express = require('express');
var router = express.Router();
const userModel = require('../models/users');
const codeModel = require('../models/codes');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// Sign in
router.post('/sign-in', async (req, res) => {

  const today = new Date();
  let firstTime;
  const user = await userModel.findOne({ email: req.body.email });

  if (!user.dateFirstConnection) {
    firstTime = true;
  } else {
    firstTime = false;
  }
  
  console.log('Première connexion au site ? ' + firstTime);
  
  if (req.body.password === user.password) {
    await userModel.updateOne({ email: req.body.email }, { dateFirstConnection: today });
    res.json({ userFound: true, user, firstTime });
  } else {
    res.json({ userFound: false });
  };
});


// Sign in PARTICIPANTS
router.post('/join-in', async (req, res) => {

  const atelier = await codeModel.findOne({ code: req.body.code });

  if (atelier === null) {
    res.json({ match: false });
  } else {
    res.json({ match: true });
  };
});

module.exports = router;
