const { JWT_SECRET } = require("../secrets"); // use this secret!

const jwt = require('jsonwebtoken')

const { findBy } = require('../users/users-model')


const validateUsernameAndPassword = async (req, res, next) => {
    if (!req.body.username || !req.body.username.trim() || !req.body.password || !req.body.password.trim()) {
        next({ message: 'username and password required' }) 
    } //checking to see if the username and password are in the request body
    else {
        next()
    } //if the username and password are in the request body then I just call next()
}


const checkUsernameTaken = async (req, res, next) => {
    res.json({ message: 'check username taken is working' })
    next()
}



const checkUsernameExists = async (req, res, next) => {

      try {
        const [user] = await findBy({ user: req.body.username })
        if (!user) {
          next({ status: 422, message: "invalid credentials" })
        } else {
          req.user = user //<< this way we already have the password on the req object when the time comes to compare it
          next()
        }
      } catch (err) {
        next(err)
      } 
  }





  module.exports = {
    checkUsernameExists,
    validateUsernameAndPassword,
    checkUsernameTaken,

  }