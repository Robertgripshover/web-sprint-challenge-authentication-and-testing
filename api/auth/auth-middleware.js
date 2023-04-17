const { JWT_SECRET } = require("../secrets"); // use this secret!

const jwt = require('jsonwebtoken')

const { findBy } = require('../users/users-model')


const validateUsernameAndPassword = async (req, res, next) => {

}


const checkUsernameTaken = async (req, res, next) => {

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

  }