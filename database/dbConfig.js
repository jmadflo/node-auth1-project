const knex = require('knex')

// Variable will automatically switch from development if I was to upload to heroku and input a config var for it.
const currentEnvironment = process.env.DB_ENV || 'development'
const knexConfig = require('../knexfile.js')[currentEnvironment]

module.exports = knex(knexConfig)