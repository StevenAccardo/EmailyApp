//This is a subdocument that will be associated with the recepient property in the Survey model class.

const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false }
});

//When making a subdocument, you export the schema instead of creating a model class.
module.exports = recipientSchema;
