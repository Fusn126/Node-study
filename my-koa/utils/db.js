var mysql = require('mysql')

var pool = mysql.createPool({
  host: 'localhost', // 连接的服务器(代码托管到线上后，需改为内网IP，而非外网)
  port: 3306, // mysql服务运行的端口
  database: 'my_data', // 选择的库
  user: 'root', // 用户名
  password: 'Fusn126', // 用户密码
  queueLimit: 0, // unlimited queueing
  connectionLimit: 0, // unlimited connections
})

//对数据库进行增删改查操作的基础
function query(sql, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err)
    }
    connection.query(sql, function (err, rows) {
      if (err) {
        console.log(err)
      }
      callback(err, rows)
    })
  })
}
exports.query = query
