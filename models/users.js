const mongoose = require("mongoose");

/* ajuster face au DBSCHEMA*/

const notesSchema = mongoose.Schema({
  title: String,
  content: String
})

const atelierSchema = mongoose.Schema({
  dateSession: String,
  activités: [{type: mongoose.Schema.Types.ObjectId, ref: 'fichesActivités'}],
  cadrage: Object,
  codeSession: String
})

const userSchema = mongoose.Schema({
  firstname: String,
  name: String,
  email: String,
  password: String,
  company: String,
  dateFirstConnection: Date,
  token: String,
  avatar: String,
  notes: [notesSchema],
  favorisActivites: [{type: mongoose.Schema.Types.ObjectId, ref: 'fichesActivités'}],
  tousLesAteliersCréer: [atelierSchema]

});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
