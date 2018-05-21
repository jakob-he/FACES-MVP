const express = require('express');
const router = express.Router();
const Journalist = require('../models/journalist');

//get a list of Journalist from the db
router.get('/journalist', function(req, res, next){
  Journalist.find({}).then(function(journalist){
    res.send(journalist);
  });
});
//add a Journalist in the db
router.post('/journalist', function(req, res, next){
  var journalist = new Journalist(req.body);
  journalist.save().then(function(journalist){
    res.send(journalist);
  }).catch(next);
});



//add an Artikel to the Journalist
router.post('/journalist/:id', function(req, res, next){
  Journalist.findOne({_id: req.params.id}).then(function(record){
    record.artikel.push({title: req.body.title, text: req.body.text});
    record.save().then(function(){
      res.send(record);
    }).catch(next);

  });
});


//update a Journalist from the db
router.put('/journalist/:id', function(req, res, next){
  Journalist.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    Journalist.findOne({_id: req.params.id}).then(function(journalist){
      res.send(journalist);
    });
  });
});
//deltes are Journalist from db
router.delete('/journalist/:id', function(req, res, next){
  Journalist.findByIdAndRemove({_id: req.params.id}).then(function(journalist){
    res.send(journalist);
  });
});
module.exports = router;
