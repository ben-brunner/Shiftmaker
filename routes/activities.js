var express = require('express');
var router = express.Router();
const fichesTheoriquesModel = require('../models/fichesTheoriques');
const fichesActivitesModel = require('../models/fichesActivites');
const userModel = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// Récupérer toutes les fiches THEORIQUES de la base
router.get('/get-theory', async (req, res) => {

  const fiches = await fichesTheoriquesModel.find();

  if (fiches) {
    res.json({ result: true, fiches });
  } else {
    res.json({ result: false });
  };
});

// Récupérer toutes les fiches ACTIVITES de la base
router.get('/get-activities', async (req, res) => {

  const fiches = await fichesActivitesModel.find();

  if (fiches) {
    res.json({ result: true, fiches });
  } else {
    res.json({ result: false });
  };
});


// Récupérer les fiches activités LIKEES par un user
router.get('/get-liked/:userid', async (req, res) => {

  const user = await userModel.findById(req.params.userid)
  .populate('favorisActivites')
  .exec();

  const fichesLiked = user.favorisActivites;

  if (fichesLiked) {
    res.json({ result: true, fichesLiked });
  } else {
    res.json({ result: false });
  };
});


// Ajouter une fiche activité aux favoris
router.post('/add-fav', async (req, res) => {
  let check;

  const user = await userModel.findById(req.body.id);
  if (!user.favorisActivites.includes(req.body.ficheId)) {
    user.favorisActivites.push(req.body.ficheId);
    const savedInfo = await user.save();
    check = true;
  }

  if (check) {
    res.json({ result: true })
  } else {
    res.json({ result: false })
  };
});

module.exports = router;
