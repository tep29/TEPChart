
// 邮箱方法
const { emailSignUp } = require('../plugins/emailserver')
const dbServer = require('../server/dbServer')
const fileMiddleware = require('../middleware/file')

module.exports = (app) => {

     // 邮箱测试
     app.post('/api/mail', async (req, res) => {
          const mail = req.body.mail

          const success = await emailSignUp(mail)

          res.status(200).send({
               message: "发送成功",
               accepted: success.accepted[0],
               messageId: success.messageId
          })
     })

     // 注册
     app.post("/api/signup", dbServer.signUp)
     // 登录
     app.post("/api/login", dbServer.signin)
     // 搜索
     app.post('/api/search', dbServer.search)
     // 个人信息
     app.get('/api/userInfo', dbServer.userInfo)
     // 修改个人信息
     app.post('/api/userInfo/update', dbServer.updateUserInfo)
     // 上传图片
     app.post('/api/upload', fileMiddleware().single('file'), dbServer.upload)
     // 修改好友昵称
     app.post('/api/friend/markName', dbServer.friendMarkName)

     // 添加好友
     app.post('/api/friend/add', dbServer.applyFriend)



     // 判断是否为好友
     app.post('/api/verifi/friend', dbServer.isFriend)




}
