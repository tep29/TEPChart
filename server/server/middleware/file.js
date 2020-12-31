/**
 * 由于express无法获取上传文件
 * 所以使用 multer 依赖包进行中间件处理
 */
module.exports = () => {
     const multer = require('multer')
     const upload = multer({ dest: __dirname + '/../uploads' })
     return upload
}