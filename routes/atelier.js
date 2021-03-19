var express = require('express');
var router = express.Router();

var userModel = require('../models/users');
var codeModel = require('../models/codes')

router.get('/save', async function(req, res, next){

    // Enregistrement BDD Code
    var newCodeSession = Math.random().toString(36).substr(2, 5).toUpperCase();

    var code = new codeModel({
        code: newCodeSession,
    })

    saveCode = await code.save()

    // Enregistrement BDD Atelier
    var user = await userModel.findOne({_id: req.query.idUser});
    
    user.tousLesAteliersCréer.push({dateSession: req.query.atelierDate, cadrage: {title: req.query.atelierName }, codeSession: newCodeSession })

    var saveUser = await userModel.updateOne({_id: req.query.idUser}, {tousLesAteliersCréer: user.tousLesAteliersCréer})

    res.json({result: true, codeSession: saveCode})
})
module.exports = router;