const mongoose = require('mongoose')

let CategorySchema = new mongoose.Schema({
    category_id: {
        type: String,
        default: 0, // 默认为一级分类
    },
    category_name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    category_img: {
        type: String
    },
    sort: {
        type: String
    },
    show_home: {
        type: Boolean
    },
    expand: {
        type: Boolean
    }
})

module.exports = mongoose.model('Category', CategorySchema)