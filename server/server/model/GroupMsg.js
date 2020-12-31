const mongoose = require('mongoose')

// 群消息
const Schema = new mongoose.Schema({
     userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  // 发送者id
     friendID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },       // 接收者id
     message: { type: String },                                                                       // 发送内容
     types: { type: Number },                                                                           // 发送类型（0 文字， 1 图片链接， 2 音频链接）
     sendTime: { type: Date }, // 发送时间
})


module.exports = mongoose.model('GroupMsg', Schema)