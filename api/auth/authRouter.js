const bcryptjs = require('bcryptjs')

const router = require('express').Router()

const Users = require('../users/usersModel')
const { isValid } = require('../users/usersService')

router.post('/register', (req, res) => {
    // req.body are the credentials
    const credentials = req.body

    if (isValid(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 12
        // hash the password
        credentials.password = bcryptjs.hashSync(credentials.password, rounds)

        // save the user to the database
        Users.add(credentials)
            .then(user => {
                // console.log(user)
                req.session.loggedIn = true
                req.session.user = user

                res.status(201).json({ data: user })
            })
            .catch(() => {
                res.status(500).json({ message: 'You could not be registered' })
            })
    } else {
        res.status(400).json({ message: 'Please provide username and password, and the password shoud be alphanumeric.'}
    )}
})

router.post('/login', (req, res) => {
    const { username, password } = req.body

    if (isValid(req.body)) {
        Users.findBy({ username })
            .then(([user]) => {
                // console.log(user)
                // compare the password the hash stored in the database
                if (user && bcryptjs.compareSync(password, user.password)) {
                    // we can save information about the client inside the session (req.session)
                    req.session.loggedIn = true
                    req.session.user = user

                    res.status(200).json({ message: `Welcome to our API ${username}!` })
                } else {
                    res.status(401).json({ message: 'Invalid credentials' })
                }
            })
            .catch(error => {
                res.status(500).json({ message: error.message })
            })
    } else {
        res.status(400).json({ message: 'Please provide username and password and the password should be alphanumeric'})
    }
})

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err){
                res.status(500).json({ message: 'We could not log you out, try later please.' })
            } else {
                res.status(204).end()
            }
        })
    } else {
        res.status(204).end()
    }
})

module.exports = router