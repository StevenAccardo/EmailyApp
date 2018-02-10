//commonJS modules
const express = require('express');
const mongoose = require('mongoose');
//allows us to use cookies to track if user is logged in
//cookie-session is a middleware
const cookieSession = require('cookie-session');
//helps handle the oauth flow for us
//passport is a middleware
const passport = require('passport');
//parses the body of any post requests coming into the server since express doesn't do that by default
//body-parser is a middleware
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/User');
require('./models/Survey');
//just importing, and not using. no vairable name needed.
require('./services/passport');

//connects to DB.
mongoose.connect(keys.mongoURI);

//You may have multiple instances of express in a single node project
//In this course we will only use a single app
//used to setup path for incoming requests
const app = express();

//ALL OF THE MIDDLEWARES BELOW ARE BEING APPLIED TO EVERY SINGLE REQUEST THAT HITS THE DESIGNATED PORTS

//parses the body element for any incoming requests and makes the data in the body element available in json format
//assigns parsed data to req.body of incoming request
app.use(bodyParser.json());

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
//the require statement returns the function from authRoutes
//it is then immediatly invoked by the second set of parens and passed the app variable.
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

//Only happens in production
if (process.env.NODE_ENV === 'production') {
  //This is how express will serve up our production assets like our main.js or main.css files
  //If express doesn't recognize the route then it will look into the client/build directory to see if any files match the route.
  //If so, it will return the requested file.
  app.use(express.static('client/build'));

  //if the above code didn't yield any files to return, then this is the catch all case.
  //At this point we assume that whatever route was being requested must be handled by the front end, in this case react router, and therefore we will just respond with the index.html file.
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//whenever heroku runs our application, it can inject environment variables, which are variables that are set in the underlying runtime which Node is running on top of.
const PORT = process.env.PORT || 5000;
//express app tells node that it wants listen on a certain port for incoming http requests.
app.listen(PORT, function(err) {
  console.log('pid is ', process.pid);
});
