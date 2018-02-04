//imports the file that holds the stripe secret key
const keys = require('../config/keys');
//imports the stripe library and passess it it the secret key
const stripe = require('stripe')(keys.stripeSecretKey);
//imports our custom middleware that checks whether the user has loggedin
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  //1st arg: the route the server should watch for post requests
  //2nd arg: middleware that we want run prior to the request handler being executed. Passed in as a reference to the function becuase express will execute it internally whenever a request comes in for that route.
  //3rd arg: request handler
  //The middleware will only be run on this route, and not every route
  //app.post, app.get, and etc allow for unlimited Args as long as one of them eventually handles the request and sends back a response.
  app.post('/api/stripe', requireLogin, async (req, res) => {
    //how to create a charge object with stripe that will get sent to them to authorize the client's payment
    const charge = await stripe.charges.create({
      //This is the amount that they will be charged.
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      //the body parser middleware places the parsed json in req.body
      source: req.body.id
    });
    //There is never a confirmation step to ensure that the card was charged correctly.
    //The user property is available on the req object because passport created it through the authorization flow.
    //Here we are adding 5 credits to the user's credit balance
    req.user.credits += 5;
    //Saving the updated user info to the mongo db
    //async call, so have to wait
    //After saving, always assign the new saved/most updated user to a variable and use that moving forward.
    //This ensures we use the most updated info
    //This user and the original req.user are completely seperate objects in memory
    const user = await req.user.save();

    //sends the updated data back to the clientside.
    res.send(user);
  });
};
