const mongoose = require('mongoose')

let tagSchema = new mongoose.Schema({
  categoryId: {
    type: String,
    default: 0, // 默认为一级分类
  },
  type: {
    type: String,
  },
  categoryname: {
    type: String,
    required: true
  },
  categoryImg: {
    type: String
  }
})

module.exports = mongoose.model('Tag', tagSchema)