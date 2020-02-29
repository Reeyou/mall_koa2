const mongoose = require('mongoose')

let productSpuSchema = new mongoose.Schema({
  id: {type: Number, isRequired: true}, // 主键
  skuid: {type: Number, isRequired: true},
  categoryId: {type: Number, isRequired: true},
  name: {type: String, isRequired: true},
  desc: {type: String, isRequired: true},
  pic: {type: String, isRequired: true}, // 商品主图
  saleable: {type: Boolean, default: true},
  valid: {type: Boolean, default: true},
  create_time: {type: String, default: new Date().getTime()},
  update_time: {type: String, default: new Date().getTime()}
})

module.exports = mongoose.model('ProductSpu', productSpuSchema)