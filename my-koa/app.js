const Koa = require('koa2'); //引入koa
const app = new Koa();
const port = 5050;
const router = require('./router')
const cors = require('koa2-cors')
const path = require('path')
const static = require('koa-static')

app.use(static(path.join(__dirname+'/assets')))
app.use(cors()) //允许koa进行跨域
app.use(router.routes(), router.allowedMethods())


app.listen(port, () => {
	console.log('Server is running at http://localhost:' + port);
})
// 新的内容来了
