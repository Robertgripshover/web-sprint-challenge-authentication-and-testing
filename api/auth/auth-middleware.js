const { JWT_SECRET } = require("../secrets"); // use this secret!

const jwt = require('jsonwebtoken')

const { findBy } = require('./auth-model')


const validateUsernameAndPassword = async (req, res, next) => {
    if (!req.body.username || !req.body.username.trim() || !req.body.password || !req.body.password.trim()) {
        next({ message: 'username and password required' }) 
    } 
    else {
        next()
    } 
} //<< working!!!


const checkUsernameTaken = async (req, res, next) => {
    try {
        const [user] = await findBy({ username: req.body.username })
        if (user) {
          next({ message: "username taken" })
        }
        else { 
          next()
        }
      } catch (err) {
        next(err)
      } 
} //<< working!!!



const checkUsernameExists = async (req, res, next) => {

      try {
        const [user] = await findBy({ username: req.body.username })
        if (!user) {
          next({ status: 422, message: "invalid credentials" })
        } else {
          req.user = user 
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