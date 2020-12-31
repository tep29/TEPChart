


module.exports = options => {
     const { jwtVerify } = require('../plugins/jwt')
     const User = require('../model/User')
     function errorFunc(res, next) {
          res.status(401).send({
               redirectTo: '/pages/signin',
               message: "请先登录"
          })
          return next()
     }

     return async (req, res, next) => {
          // 判断是否需要登录
          const { notVerifyArray } = require('../plugins/credentials')

          const isUrlHasToken = !notVerifyArray.map(url => `/api/${url}`).some(url => req.url.includes(url))

          if (isUrlHasToken) {
               const token = String(req.headers.authorization).split(' ').pop().trim()

               if (token == "undefined" || token == 'null') return errorFunc(res, next)  // 提供 jwt token

               const { verifyToken } = await jwtVerify(token)
               if (!verifyToken) return errorFunc(res, next)

               req.user = await User.findById({ _id: verifyToken }) // 根据 token 返回的id查找用户
               if (!req.user) return errorFunc(res, next)  // 找不到用户
          }


          await next()
     }
}