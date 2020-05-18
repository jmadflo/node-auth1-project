const router = require('express').Router()
const Users = require('./users-model.js')
const { restricted } = require('./usersService')

router.use(restricted)

router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.json(users)
        })
        .catch(() => res.status(500).json({ message: 'users could not be found'}))
})

module.exports = router