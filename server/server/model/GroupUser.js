const mongoose = require('mongoose')

// 群成员
const Schema = new mongoose.Schema({
     groupID: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },  // 群id
     userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },       // 用户id
     name: { type: String },                                                                       // 群内名称
     tip: { type: Number, default: 0 },                                                           // 未读消息数
     shield: { type: Number },                                                                    // 是否屏蔽群消息 0不 1 是
     time: { type: Date }, // 时间
     lastTime: { type: Date} // 最后通讯时间
})


module.exports = mongoose.model('GroupUser', Schema)