//commonJS modules
const express = require('express');

//You may have multiple instances of express in a single node project
//In this course we will only use a single app
//used to setup path for incoming requests
const app = express();

//this is referred to as a route handler
//.get tells express to watch for incoming requests
// the '/' means to look for any requests attempting to access the '/' route.
//req represents the incoming request object
//res represents the outgoing response object
//res.send immediatly closes the response after sending back the object included in the ()
app.get('/', (req, res) => {
  res.send({ bye: 'buddy' });
});

//whenever heroku runs our application, it can inject environment variables, which are variables that are set in the underlying runtime which Node is running on top of.
const PORT = process.env.PORT || 5000;
//express app tells node that it wants listen on a certain port for incoming http requests.
app.listen(PORT);
