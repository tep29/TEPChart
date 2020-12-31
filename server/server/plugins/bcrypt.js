const bcrypt = require('bcrypt')

/**
 * 加密
 * @param {String}} value 密码
 */
exports.encryption = value => {
     return bcrypt.hashSync(value, 10)
}
/**
 * 解密
 * @param {String} value 密码
 * @param {String} hash 数据库密码
 */
exports.verification = (value, hash) => {
     // 对比
     return bcrypt.compareSync(value, hash)
}