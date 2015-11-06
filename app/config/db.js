var mongoose = require('mongoose')

// Use native promises
mongoose.Promise = global.Promise

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/express_app_v7'

mongoose.connect(MONGO_URL)

mongoose.set('debug', false)

module.exports = mongoose
