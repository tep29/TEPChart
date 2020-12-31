const mongoose = require('mongoose')

// 用户表
const Schema = new mongoose.Schema({
     username: { type: String },  // 用户名
     password: { type: String, select: false },     // 密码
     email: { type: String, unique: true }, // 邮箱 唯一
     sex: { type: Number, default: 2 }, // 0 女 1 男 2 中性
     birth: { type: String, default: "" }, // 生日
     phone: { type: Number, default: "" }, // 电话
     explain: { type: String, default: "" }, // 介绍
     avatar: { type: String, default: "" }, // 头像
     createTime: { type: Number, default: new Date().getTime() }, // 注册时间
})


module.exports = mongoose.model('User', Schema)