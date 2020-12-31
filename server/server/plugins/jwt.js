const jwt = require('jsonwebtoken')
const { SECRET } = require('./credentials')


/**
 * jwt 生成token
 * 根据 传入的值生成 token
 * @param {Object} id  
 */
exports.jwtSign = (id) => {
     return jwt.sign(id, SECRET, { expiresIn: 60 * 60 })
}



/**
 * jwt  解析 token 获取用户信息
 * @param {String} token 用户token
 * @method  async
 */
exports.jwtVerify = (token) => {
     return new Promise((resolve) => {
          jwt.verify(token, SECRET, (error, decoded) => {
               if (error) {
                    let status = error.name == 'JsonWebTokenError' ? 0 : 1
                    /**
                     * JsonWebTokenError     无效的token
                     * TokenExpiredError        token过期
                     */
                    resolve({ verifyToken: false, errMsg: error.name, errStatus: status })
               } else {
                    resolve({ verifyToken: decoded.id })
               }
          })
     })
}