exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments()
        table.text('username').notNullable().unique().index() // index() makes it easier to search through usernames
        table.text('password').notNullable()
    })
}

exports.down = function(knex) {
    knex.schema.dropTableIfExists('users')
}
