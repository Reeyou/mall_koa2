const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  create_time: {type: String, default: new Date().getTime()},
  update_time: {type: String, default: new Date().getTime()}
})

module.exports = mongoose.model('User', userSchema)