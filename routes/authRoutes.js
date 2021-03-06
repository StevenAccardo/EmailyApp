const passport = require('passport');

module.exports = app => {
  //A route that passess the google strategy, with an internal reference of 'google'. 2nd arg is an options object that lets the google servers know what we want access too.
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  //this is the route for the callback after the user has authenticated
  //passport.authenticate is actually a middleware
  //after the authentication has been completed, the 3rd arg function is called and the user is redirected to the passed in relative url
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout', (req, res) => {
    //deletes all user ids
    req.logout();
    //reroutes user to root directory
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};

//this is referred to as a route handler
//.get tells express to watch for incoming requests
// the '/' means to look for any requests attempting to access the '/' route.
//req represents the incoming request object
//res represents the outgoing response object
//res.send immediatly closes the response after sending back the object included in the ()
// app.get('/', (req, res) => {
//   res.send({ bye: 'buddy' });
// });
