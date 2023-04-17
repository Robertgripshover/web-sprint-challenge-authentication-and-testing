const db = require('../../data/dbConfig')

function find() {
    return db('users').select('user_id', 'username', 'password') //<< remove password later
}


function findBy(filter) {
    return db('users')
    .select('user_id', 'username', 'password')
    .where(filter)
}


function findById(user_id) {
    return db('users')
    .select('user_id', 'username')
    .where('user_id', user_id).first()
}


async function add({ username, password }) {

    let created_user_id

    await db.transaction(async trx => {
        const [user_id] = await trx('users').insert({ username, password })
        created_user_id = user_id
    })

  
    return findById(created_user_id)
}


  module.exports = {
    find,
    findBy,
    findById,
    add
}