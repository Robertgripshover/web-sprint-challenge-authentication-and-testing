
const { JWT_SECRET } = require("../secrets"); // use this secret!

const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
  
  const token = req.headers.authorization //<< this is where you can find the token
  if (!token) {
    return next({ status: 401, message: 'token required' })
  }
  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      next({ status: 401, message: 'token invalid' }) //<< this path means the token is bad for some reason
    } else {
      req.decodedToken = decodedToken //<< tacking the decoded token onto the req object, this containts the decoded info about the user
      next()
    }
  })
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
}; //this is working!!!
