const mongoose = require('mongoose')

let productSkuSchema = new mongoose.Schema({
  id: {type: Number, isRequired: true}, // sku主键
  spuId: {type: Number, isRequired: true},
  categoryId: {type: Number, isRequired: true},
  name: {type: String, isRequired: true},
  enable: {type: Boolean, default: true},
  skuList: {type: Object, default: true}, // sku规格
  create_time: {type: String, default: new Date().getTime()},
  update_time: {type: String, default: new Date().getTime()}
})

module.exports = mongoose.model('ProductSku', productSkuSchema)