// Write your tests here

const db = require('../data/dbConfig')

const Auth = require('./auth/auth-model')



beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})



test('enviroment is testing', () => {
  expect(process.env.NODE_ENV).toBe('testing')
}) //testing enviroment is up and running

describe('getAll', () => {
  test('resolves all the users in the table', async () => {
    const result = await Auth.getUsers()
    console.log(result)
  })
})