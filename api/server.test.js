// Write your tests here

const db = require('../data/dbConfig')

const Auth = require('./auth/auth-model')






beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})






// beforeEach(async () => {
//   await db.seed.run()
// })

//I NEED TO GET MY SEED UP AND WORKING



//Test scafolding

//test 1 for register endpoint
//>>> test to see if giving a new correctly formatted username and password makes a new user
//that responds with a username and an id (maybe password too)

//test 2 for register endpoint
//>>> test to see if a username spelled wrong responds with message: 'username and password required'


//test 1 for login endpoint

//(might need the seed for this) using a username and password that are already contained
//in the seed (thus the db) see if giving that username and password responds with
//the message '${user} is back!'

//or maybe you could do something more simple




//test 2 for login endpoint
//giving the wrong username or password responds with username and password required














test('enviroment is testing', () => {
  expect(process.env.NODE_ENV).toBe('testing')
}) //testing enviroment is up and running

describe('getAll', () => {
  test('resolves all the users in the table', async () => {
    const result = await Auth.getUsers()
    
  })
})