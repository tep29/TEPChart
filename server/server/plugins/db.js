module.exports = app => {
     const mongoose = require('mongoose')
     mongoose.set('useCreateIndex', true)
     mongoose.connect("mongodb://localhost:27017/chat", {
          useNewUrlParser: true,
          useUnifiedTopology: true
     })
}