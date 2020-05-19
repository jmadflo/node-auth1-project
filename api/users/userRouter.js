const express = require('express')
const Users = require('./usersModel')
const { restricted } = require('./usersService')

const router = express.Router()

router.use(restricted)

router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.json(users)
        })
        .catch(() => res.status(500).json({ message: 'Users could not be found' }))
})

module.exports = router