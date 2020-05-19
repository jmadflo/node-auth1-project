const express = require('express')
const session = require('express-session')

const authRouter = require('./auth/authRouter')
const userRouter = require('./users/userRouter')

const sessionConfig = {
    cookie: {
      maxAge: 1000 * 60 * 60, // one hour in milliseconds
      secure: process.env.SECURE_COOKIE || false, // send the cookie only over https, true in production
      httpOnly: true, // true means client JS cannot access the cookie
    },
    resave: false,
    saveUninitialized: process.env.USER_ALLOWED_COOKIES || true,
    name: "monster",
    secret: process.env.COOKIE_SECRET || "keepitsecret,keepitsafe!",
}

const server = express()
// create a session and send a cookie back (the cookie will store the session id)
server.use(session(sessionConfig)) // turn on sessions for the API
server.use(express.json())
server.use("/api/users", userRouter)
server.use("/api/auth", authRouter)

module.exports = server