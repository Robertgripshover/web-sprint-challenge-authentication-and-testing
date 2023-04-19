// Write your tests here

const db = require('../data/dbConfig')

const Auth = require('./auth/auth-model')

// const User = require('./users/users-model')


// beforeAll(async () => {
//   await db.migrate.rollback()
//   await db.migrate.latest()
// })

// beforeEach(async () => {
//   await db.seed.run()
// })



// test('sanity', () => {
//   expect(true).toBe(false)
// })


test('enviroment is testing', () => {
  expect(process.env.NODE_ENV).toBe('testing')
}) //testing envirment is up and running

describe('getAll', () => {
  test('resolves all the users in the table', async () => {
    const result = await Auth.getUsers()
    console.log(result)
  })
})