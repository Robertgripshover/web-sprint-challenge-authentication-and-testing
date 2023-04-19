exports.seed = function(knex, Promise) {
    return knex('users')
    .truncate()
    .then(function() {
        return knex('users').insert([
            {username: 'robertgrips1'},
            {username: 'robertgrips2'},
            {username: 'robertgrips2'},
        ])
    })
}