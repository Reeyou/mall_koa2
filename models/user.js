const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  // 0-管理员 1-游客
  role: {type: String, default: "1"},
  token: {type:String},
  create_time: {type: String, default: new Date()},
  update_time: {type: String, default: new Date()}
})

module.exports = mongoose.model('User', userSchema)