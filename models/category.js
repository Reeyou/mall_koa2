const mongoose = require('mongoose')

let tagSchema = new mongoose.Schema({
  categoryname: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Tag', tagSchema)