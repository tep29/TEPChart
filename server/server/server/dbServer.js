const User = require('../model/User')
const Group = require('../model/Group')
const GroupUser = require('../model/GroupUser')
const Message = require('../model/Message')
const Friend = require('../model/Friend')
const { encryption, verification } = require('../plugins/bcrypt')
const { jwtSign } = require('../plugins/jwt')

module.exports = {
     /**
      * 注册接口
      * @param {String} username   用户名
      * @param {String} password   密码
      * @param {String} email          邮箱（唯一）
      */
     signUp: async (req, res) => {
          const { username, password, email } = req.body

          const isMail = await User.findOne({ email })

          if (isMail) return res.status(422).send({
               message: "邮箱已存在"
          })

          const userData = await User.create({
               username,
               password: encryption(password),    // 加密
               email
          })

          res.send({
               message: "注册成功！",
               _id: userData._id,
               username: userData.username,
               email: userData.email
          })

     },

     /**
      * 登录接口
      * @param {String} email   邮箱
      * @param {String} password   密码
      */
     signin: async (req, res) => {
          const { email, password } = req.body

          // 1. 查询判断用户邮箱是否存在 
          //        select('+password') 开启密码查询显示
          const user = await User.findOne({ email }).select('+password')
          if (!user) return res.status(422).send({
               message: "用户不存在，请去注册！"
          })

          // 2. 校验密码
          const isVaild = verification(password, user.password)
          if (!isVaild) return res.status(422).send({
               message: "密码错误！"
          })

          // 3. 返回Token
          // const token = jwt.sign({ id: user._id }, credentials.SECRET,{ expiresIn: 5000 })
          const token = await jwtSign({ id: user._id })
          res.status(200).send({
               message: `欢迎您， 尊贵的用户${user.username}`,
               token,
               userID: user._id
          })

     },

     /**
      * 搜索接口 用户/群组
      * @param {String} search 搜索内容
      */
     search: async (req, res) => {
          const { search } = req.body

          // 搜索查询用户数据
          function userData() {
               const whereUser = { $or: [{ "username": { $regex: search } }, { "email": { $regex: search } }] }
               const outUser = { "username": 1, "email": 1, "avatar": 1, "sex": 1 }
               return User.find(whereUser, outUser)
          }
          // 搜索查询群组数据
          function groupData() {
               const whereGroup = { $or: [{ "name": { $regex: search } }] }
               const outGroup = { "username": 1, "email": 1, "avatar": 1, "sex": 1 }
               return Group.find(whereGroup, outGroup)
          }

          res.send({ user: await userData(), group: await groupData() })
     },

     /**
      * 获取个人信息接口
      */
     userInfo: async (req, res) => {
          const { jwtVerify } = require('../plugins/jwt')

          const token = String(req.headers.authorization).split(' ').pop().trim()
          const { verifyToken } = await jwtVerify(token)

          if (!verifyToken) {
               return res.send({ message: "服务器错误" })
          }

          let where = { "_id": verifyToken }
          const userData = await User.findById(where)
          res.send({ userinfo: userData })

     },

     /**
      * 修改个人信息资料
      */
     updateUserInfo: async (req, res) => {
          const user = await User.findById(req.body._id).select('+password')
          if (req.body.password) {
               const pwdMatch = verification(req.body.password, user.password)
               if (!pwdMatch) {
                    req.body.password = encryption(req.body.password)
               }
          }
          console.log(user.createTime)
          req.body.createTime = user.createTime
          const result = await User.findByIdAndUpdate(req.body._id, req.body).exec()
          res.send({
               code: 0,
               message: "修改成功！"
          })
     },
     /**
      * 上传图片
      */
     upload: async (req, res) => {
          // express 无法获取上传文件 需要中间件操作
          const file = req.file
          file.url = `http://localhost:3000/uploads/${file.filename}`
          res.send({
               code: 0,
               file,
               message: "上传成功！"
          })
     },
     /**
      * 修改好友昵称
      */
     friendMarkName: async (req, res) => {
          const { uid, fid } = req.body
          const firendData = await Friend.updateOne({ userID: uid, "friendID": fid })
          res.send(firendData)
     },

     // 添加好友表
     addFriend: async (req, res) => {
          const { uid, fid } = req.body
          let date = new Date().getTime()
          const friend = await Friend.create({
               userID: uid,
               friendID: fid,
               stats: 1,
               createTime: date,
               markname: '',
               lastTime: date
          })
          console.log(friend)
          res.send(friend)
     },
     // 添加一对一消息
     inserMsg: async (req, res) => {
          const msg = await Message.create(req.body)
          res.send(msg)
     },
     // 好友申请
     applyFriend: async (req, res) => {
          const { uid, fid } = req.body
          // 判断是否申请过
          const firend = await Friend.countDocuments({ "userID": uid, "friendID": fid })
          // firend = 0 初次申请
          console.log(friend)
          // if (firend == 0) {
          //      this.addFriend(uid, fid, 2)
          //      this.addFriend(fid, uid, 1)
          // } else {
          //      this.upFriendLastTime(uid, fid)
          //      this.upFriendLastTime(fid, uid)
          // }
          // this.inserMsg({ uid, fid, msg, 0, res })

     },
     // 好友最后通讯时间
     upFriendLastTime: async (req, res) => {
          const { uid, fid } = req.body
          const friend = await Friend.updateOne({ "userID": uid, "firendID": fid }, { "lastTime": new Date().getTime() })
          res.send(friend)
     },


     /**
      * 判断是否为好友
      * @param {*} uid 用户id
      * @param {*} fid 好友id
      * @param {*} state 好友状态 
      */
     isFriend: async (req, res) => {
          const { uid, fid } = req.body
          const where = { "userID": uid, "friendID": fid, "state": 0 }
          const friend = await Friend.findOne(where)
          console.log(friend)
          res.send('ok')
     },

     isInGroup: (req, res) => {
          const { uid, gid } = req.body
          const where = { "userID": uid, "groupID": gid }

          const groupUserData = GroupUser.find(where)
          res.send(groupUserData)
     }
}
