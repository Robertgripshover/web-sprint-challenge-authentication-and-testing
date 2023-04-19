const db = require('../../data/dbConfig')

function getUsers() {
    return db('users')
} 


function find() {
    return db('users').select('user_id', 'username', 'password') //<< remove password later
}


function findBy(filter) {
    return db('users')
    .select('id', 'username', 'password')
    .where(filter)
}


function findById(id) {
    return db('users')
    .select('id', 'username', 'password')
    .where('id', id).first()
}


async function add({ username, password }) {

   
        const [id] = await db('users').insert({username, password})
        return findById(id)
    
}


  module.exports = {
    find,
    findBy,
    findById,
    add,
    getUsers
}