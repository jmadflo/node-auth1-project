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
// function add(user) {
//     return db('users').insert(user)
//         .then(([id]) => {
//             console.log(id)
//             return findById(id)
//         })
//         .catch(() => console.log('user could not be added'))
// }
async function add(user) {
    try {
        const [id] = await db("users").insert(user, "id")
        console.log(id)
        return findById(id)
    } catch (error) {
        throw error
    }
}

// find user by id
function findById(id) {
    return db('users')
        .where({ id }).first()
}
