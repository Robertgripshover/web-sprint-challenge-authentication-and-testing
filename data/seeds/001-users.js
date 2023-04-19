exports.seed = async function (knex) {
    await knex('users').truncate()

    await knex('users').insert([
      {
        id: 1,
        username: 'robertgrips1',
        password: '$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq', // password "1234"
      },
      {
        id: 2,
        username: 'robertgrips2',
        password: '$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq', // password "1234"
      },
    ])
  }
  