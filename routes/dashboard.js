var express = require('express');
var router = express.Router();



var userModel = require('../models/users');
var fichesActivitesModel = require('../models/fichesActivites');
var fichesTheoriquesModel = require('../models/fichesTheoriques');


/* Affichage des modules dashboard */
router.get('/', async function(req, res, next) {

  var user = await userModel.findOne({_id: req.query.id})

  var userInfo = await userModel.findById({_id: user._id})
                              .populate('favorisActivites')
                              .exec()
  res.json({result: true, user: userInfo})
});

router.delete('/favoris/delete', async function(req, res, next){

  var user = await userModel.findOne({_id: req.body.idUser})

  var result;

  if(!user){
    result = false
  }else{
    result = true
    for (let i = 0; i < user.favorisActivites.length; i++) {
      if(user.favorisActivites[i] == req.body.idFavoris){
        user.favorisActivites.splice(i,1)
        console.log(user.favorisActivites);
        await user.save()
      }
    }
  }

  res.json({result})
})

router.post('/notes', async function(req, res, next){

  var noteData = {title: req.body.titleFromFront, content: req.body.contentFromFront}

  var user = await userModel.findOne({_id: req.body.idUser})

  user.notes.push(noteData)

  var saveNote = await userModel.updateOne({_id: req.body.idUser}, { notes: user.notes})

  var sendUser = await userModel.findOne({_id: req.body.idUser})

  res.json({result: true, user: sendUser})
})

router.delete('/notes/delete', async function(req, res, next){

  var result;
  var user = await userModel.findOne({_id: req.body.idUser})

  if(!user){
    result = false
  }else{
    result = true
    for (let i = 0; i < user.notes.length; i++) {
      if(user.notes[i]._id == req.body.idNote){
        user.notes.splice(i,1)
        await user.save()
      }
    }
  }


  res.json({result})

})



module.exports = router;