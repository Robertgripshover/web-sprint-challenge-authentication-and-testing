const router = require('express').Router();

const { checkUsernameExists, validateUsernameAndPassword, checkUsernameTaken } = require('./auth-middleware')

const { JWT_SECRET } = require('../secrets/index'); // use this secret!
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// const User = require('../users/users-model')

const Auth = require('./auth-model')



//VV I added this one for experimentation
router.get('/register', async (req, res, next) => {
  try{ const users = await Auth.getUsers()
  res.json(users)
  } catch (err) {
    next(err)
  }
}) //<< working!!!
//^^ I added this one for experimentation



router.post('/register', validateUsernameAndPassword, checkUsernameTaken, (req, res, next) => {
  
  const { username, password } = req.body
  const hash = bcrypt.hashSync(password, 8)

  Auth.add({ username, password: hash })
    .then(savedUser => {
      res.status(201).json(savedUser)
    })
    .catch(next)

  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
    DO NOT EXCEED 2^8 ROUNDS OF HASHING!

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
  

}); //<< working!!!

router.post('/login', validateUsernameAndPassword, checkUsernameExists, (req, res, next) => {
 
  if (bcrypt.compareSync(req.body.password, req.user.password)) { //<< checkking if the password entered is legit
    const token = buildToken(req.user) //if the password is legit then it will build a token
    res.json({
      message: `${req.user.username} is back!`,
      token,
    })
  } else {
    next({ status: 401, message: "Invalid credentials" })
  }
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */

      
}); //<< working!!!

function buildToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  }
  const options = {
    expiresIn: '1d',
  } 
  return jwt.sign(payload, JWT_SECRET, options)
}

module.exports = router;
