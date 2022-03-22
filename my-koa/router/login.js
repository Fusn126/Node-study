const Router = require('koa-router')
const login = new Router()
const bodyParser = require('koa-bodyparser')
const db = require('../utils/db')

login.use(bodyParser());

login.post('/', async (ctx) => {
	let myaccount = ctx.request.body.account;
	let mypwd = ctx.request.body.pwd;
	let sql = `SELECT * FROM users WHERE account='${myaccount}'`;
	let result = await new Promise((resolve, reject) => {
		return db.query(sql, (err, data) => {
			if (err) throw err;
			if (data.length > 0) {
				resolve(data);
			} else {
				resolve(false);
			}
		})
	})
	if (result) {
		// 能找到对应的账号
		if (result[0].pwd == mypwd) {
			// 账号密码正确，返回token
			ctx.body = {
				token: result[0],
				msg: '登录成功',
				account: myaccount,
				code:200
			};
		} else {
			// 密码错误
			ctx.body = {
				msg: '这个账号密码错误',
				account: myaccount,
				code:500
			};
		}
	} else {
		// 密码错误
        ctx.body = {
            msg: '系统没有该用户',
            account: myaccount,
			code:501
        };
	}
})

module.exports = login;