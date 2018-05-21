const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create a Journalist and an ArtikelSchema
const ArtikelSchema = new Schema({

  title: {
    type: String,
    required:[true, 'Titel wird benötigt']
  },
  text: String

});

const JournalistSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  rank: {
    type: String
  },
  artikel:[ArtikelSchema]


});

JournalistSchema.static('findByName', function(name, callback){
  return this.find({name: name},callback);
});

const Journalist = mongoose.model('journalist', JournalistSchema);
module.exports = Journalist;
