const mongoose = require('mongoose')

let productSkuSchema = new mongoose.Schema({
  id: {type: Number}, // sku主键
  spuId: {type: String, required: true}, // spu主键
  // categoryId: {type: Number, isRequired: true},
  enable: {type: Boolean, default: true},
  skuList: {type: Array, default: true}, // sku规格
  create_time: {type: String, default: new Date().getTime()},
  update_time: {type: String, default: new Date().getTime()}
})

module.exports = mongoose.model('ProductSku', productSkuSchema)