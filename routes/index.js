var express = require('express');
var router = express.Router();
const fichesTheoriquesModel = require('../models/fichesTheoriques');
const fichesActivitesModel = require('../models/fichesActivites');
const userModel = require('../models/users');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//récupérer les activités de la bases selon le filtre keyword
router.get('/addactivities', async (req, res) => {
  var key = req.query.keyword;
//console.log(key);
var fichesByKeyword=''
if (key ==='inclusion'){
   fichesByKeyword = await fichesActivitesModel.find({ inclusion: true });
}else if (key ==='emergence'){
fichesByKeyword = await fichesActivitesModel.find({ émergence: true });
}else if (key ==='convergence'){
fichesByKeyword = await fichesActivitesModel.find({ convergence: true });
}else if (key ==='declusion'){
fichesByKeyword = await fichesActivitesModel.find({ déclusion : true });
}
 
  //console.log(fichesByKeyword);
  if (fichesByKeyword) {
    res.json({ result: true, fichesByKeyword });
  } else {
    res.json({ result: false });
  }
})



module.exports = router;


