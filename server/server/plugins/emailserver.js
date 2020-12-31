// 发送邮件插件
const nodemailer = require('nodemailer')

// 导入证书文件
const credentials = require('./credentials')

// 创建传输方式
const transporter = nodemailer.createTransport({
     service: "163",
     auth: {
          user: credentials[163].user,
          pass: credentials[163].pass
     }
})

// 注册发送邮件给用户
exports.emailSignUp = (email, res) => {
     // 发送消息内容
     const options = {
          from: "am293q@163.com",  // 发送者
          to: email, // 接收者
          subject: "感谢您在 TEP Chat 注册",
          html: '<span>TEP Chat 欢迎您的加入</span><a href="http://localhost:8080/">点击前往 TEP Chat</a>'
     }

     // 发送邮件插件
     return new Promise((resolve, reject) => {
          transporter.sendMail(options, (err, info) => {
               if (err) return reject(err)

               resolve(info)
          })
     })


}