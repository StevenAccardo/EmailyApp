//Custom middleware
//next is a function we call when our middleware is complete, like done()
module.exports = (req, res, next) => {
  //Checking to see if the user has enough credits to create a survey, if not then they are sent back an error code.
  if (req.user.credits < 1) {
    //If not enough credits, return a status 403 which means forbidden, and an error message.
    //The server flow will not continue after the return, this protects the server from crashing or having issues
    return res.status(403).send({ error: 'Not enough credits!' });
  }

  //If the user has enough credits, then allow the request to travel to the next middleware, or next part of the server flow by calling next().
  next();
};
