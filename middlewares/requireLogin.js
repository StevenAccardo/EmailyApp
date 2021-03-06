//Custom middleware. Really just handles the case if a user hasn't been authenticated while trying to access a protected route.

//next is a function we call when our middleware is complete, like done()
module.exports = (req, res, next) => {
  //Checking to see if the user is logged in by checking to see if passport had created a user property on the request object.
  if (!req.user) {
    //If not logged in, return a status 401 which means unauthorized attempt, and an error message.
    //The server flow will not continue after the return, this protects the server from crashing or having issues
    return res.status(401).send({ error: 'You must log in!' });
  }

  //If the user is loggedin, then allow the request to travel to the next middleware, or next part of the server flow by calling next().
  next();
};
