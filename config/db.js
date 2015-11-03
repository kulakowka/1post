var mongoose = require('mongoose')

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/express_app_v3'

mongoose.connect(MONGO_URL)

mongoose.set('debug', false)

module.exports = mongoose
