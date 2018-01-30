//commonJS modules
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

require('./models/user');
//just importing, and not using. no vairable name needed.
require('./services/passport');

//connects to DB.
mongoose.connect(keys.mongoURI);

//You may have multiple instances of express in a single node project
//In this course we will only use a single app
//used to setup path for incoming requests
const app = express();

//app.use is for setting up middlewares
app.use(
  //maxAge must be passed in as milliseconds
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    //make sure to use an array because we can add multiple keys, and it will randomly use one.
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());

//when a request comes in from a signed in user, the cookie-session middleware pulls the cookie data off of the request and then assigns it to req.session in order for passport to grab it. The cookie data is found in the req.session.passport.user property.
app.use(passport.session());

//imports the routes
//the require statement returns the object from authRoutes
//it is then immediatly invoked by the second set of parens and passed the app variable.
require('./routes/authRoutes')(app);

//whenever heroku runs our application, it can inject environment variables, which are variables that are set in the underlying runtime which Node is running on top of.
const PORT = process.env.PORT || 5000;
//express app tells node that it wants listen on a certain port for incoming http requests.
app.listen(PORT);
