const express = require('express')
const app = express()
const authMiddleware = require('./middleware/auth')

app.use(require('cors')())
app.use(express.json())



// 静态文件托管
app.use('/uploads', express.static(__dirname + '/uploads'))  // 静态托管文件

// token判断
app.use(authMiddleware())

// 错误处理函数
app.use(async (err, req, res, next) => {
     res.status(err.statusCode || 500).send({
          message: err.message
     })
})

require('./plugins/db')(app)
require('./router')(app)





app.listen(3000, () => {
     console.log(`DB open in server at  http://localhost:3000`)
})