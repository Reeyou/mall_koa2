const mongoose = require('mongoose')

let productSpuSchema = new mongoose.Schema({
    category_id: { type: String, required: true },
    product_name: { type: String, required: true },
    product_solgan: { type: String },
    product_cacel: { type: String, required: true },
    code: { type: String },
    place: { type: String },
    long: { type: String, required: true },
    width: { type: String, required: true },
    height: { type: String, required: true },
    weight: { type: String, required: true },
    logistics_type: { type: String, required: true },
    logistics_value: { type: String, required: true },
    saletime_type: { type: String, required: true },
    saletime_value: { type: String },
    img_list: { type: Array, required: true },
    detail: { type: String, required: true },
    create_time: { type: String, default: new Date().getTime() },
    update_time: { type: String, default: new Date().getTime() }
})

module.exports = mongoose.model('ProductSpu', productSpuSchema)