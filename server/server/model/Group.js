const mongoose = require('mongoose')

// 群表
const Schema = new mongoose.Schema({
     userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  // 群主id
     name: { type: String },     // 群名称
     imgUrl: { type: String },  // 群头像
     notice: { type: String },  // 群公告
     createTime: { type: Date }, // 注册时间
})


module.exports = mongoose.model('Group', Schema)