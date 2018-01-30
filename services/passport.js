//base passport functionality
const passport = require('passport');
//specific strategy for google
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//gets access to the model class 'Users', without using a require method
const User = mongoose.model('users');

//passport handles taking user.id and putting it into header of response for cookie storage.
passport.serializeUser((user, done) => {
  //this is not the profile.id, it is a random id that mongo creates when ever a new user is created.
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

//tells passport what strategy to use
//GoogleStrategy needs a client id and a client secret
//We must register our app with google inorder to use their api at console.developers.google.com
//We are passing the keys that we imported.
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      //lets google know where to direct the user back too, after they have authorized access via google's screen.
      //make sure you register the callbackURL with google.
      callbackURL: '/auth/google/callback'
    },
    //accesstoken allows us to reach back to google to get data that the user authorized us to use
    //refreshToken would allow us to refresh the accesstoken after it has expired
    //profile has all of their information
    (accessToken, refreshToken, profile, done) => {
      //checks to see if we already have a user in the database
      User.findOne({ googleId: profile.id })
        //existingUser is null if there in not a record already stored
        .then(existingUser => {
          if (existingUser) {
            //we already have this user in a collection
            //done lets google know that we are finished on our side
            //arg1 is an error message, if applicable
            //arg2 is the result from the query
            done(null, existingUser);
          } else {
            //Creates our model instance using the model class user
            //.save() will actually persist/save that instance to the mongodb
            new User({ googleId: profile.id })
              .save()
              .then(user => done(null, user));
          }
        });
    }
  )
);
