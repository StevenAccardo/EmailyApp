const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');
//Sets up all of the information that the client will enter on their survey
const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  //by having the type of receipient be [String], this tells mongoose that we expect an array of strings <-This is old, but how you would make a list of strings
  //by having the type of receipient be [RecipientSchema] this tells mongoose that we expect an array subdocuments
  //Subdocument is in the Recipient.js file
  recipients: [RecipientSchema],
  //Tallies yes votes
  yes: { type: Number, default: 0 },
  //Tallies yes votes
  no: { type: Number, default: 0 },
  //This creates a reference to the user who the survey is attached to
  //The id of the user who owns the record will be in the _user value
  //The ref value tells mongoose that the reference belongs to the User collection
  //The _ in _user is not required, it could be named anything, but the _ is used by convnetion to show a relation or reference field.
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  //these will help let the client know id the survey is still active. Just a nice little shine on the app.
  dateSent: Date,
  lastResponded: Date
});

mongoose.model('surveys', surveySchema);
