const mongoose = require('mongoose')

let productSkuSchema = new mongoose.Schema({
    spu_id: { type: String, required: true }, // spu主键
    // mall_price: { type: String, required: true },
    // market_price: { type: String, required: true },
    discount: { type: String },
    cost_price: { type: String },
    color: { type: Object },
    size: { type: String },
    version: { type: String },
    img_list: { type: Array },
})

module.exports = mongoose.model('ProductSku', productSkuSchema)