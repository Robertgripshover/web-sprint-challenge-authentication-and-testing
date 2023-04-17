const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const restrict = require('./middleware/restricted.js');

const authRouter = require('./auth/auth-router.js');
const jokesRouter = require('./jokes/jokes-router.js');






const session = require('express-session')
const Store = require('connect-session-knex')(session)
const knex = require('../data/db-config')






const server = express();




server.use(session({
    name: 'oatmealraisen', //<< name of session, this will be name on the cookie
    secret: 'shh', //<< never hard code this
    saveUninitialized: false, 
    resave: false, 
    store: new Store({
      knex,
      createTable: true,
      clearInterval: 1000 * 60 * 10,
      tablename: 'sessions',
      sidfieldname: 'sid',
    }), //<< this new store takes its own configuration object
    cookie: {
      maxAge: 1000 * 60 * 10,
      secure: false, //<< IMPORTANT: if this is set to true, the server will only
      //send a cookie if it is running on https
      httpOnly: true,
      // sameSite: 'none'
  
    } //<< the configuration of the cookie is very important
  
  }))














server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', restrict, jokesRouter); // only logged-in users should have access!











server.get("/", (req, res) => {
    res.json({ api: "up and running" });
  });
  
  server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    });
  });






  




module.exports = server;
