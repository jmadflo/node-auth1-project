const db = require('../../database/dbConfig')

module.exports = {
  add,
  find,
  findBy,
  findById,
}

// find the users leave out password
function find() {
    return db('users').select('id', 'username')
}

function findBy(filter) {
    return db('users').where(filter)
}

// add a user to the database
function add(user) {
    db('users').insert(user, 'id')
        .then(([id]) => {
            return findById(id)
        })
        .catch(() => console.log('user could not be added'))
}

// find user by id
function findById(id) {
    return db('users')
        .where({ id }).first()
}
