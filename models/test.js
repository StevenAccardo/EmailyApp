const mongoose = require('mongoose');
const { Schema } = mongoose; // === const Schema = mongoose.Schema;

//mongoose makes us declare our Schema
//we can freely add in or remove properties as we see fit
const userSchema = new Schema({
  googleId: String,
  //You can post multiple options as properties, if you would like.
  credits: { type: Number, default: 0 }
});

//creates model class. 1st arg is name of model class/collection. 2nd arg is the schema.
//if we try and create a dupplicate model class, it will not overwrite the original.
mongoose.model('users', userSchema);
