const mongoose = require('mongoose')

// 好友表
const Schema = new mongoose.Schema({
     userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  // 用户id
     friendID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },     // 好友id
     stats: { type: String },  // 通过状态（0 以为好友，1 申请中，2 申请发送方 对象还未同意 ）
     createTime: { type: Number }, // 注册时间
     markname: { type: String },  // 好友昵称
     lastTime: { type: String | Number },     // 最后通讯时间
})


module.exports = mongoose.model('Friend', Schema)