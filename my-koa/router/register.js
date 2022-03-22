const Router = require('koa-router')
const register = new Router()
const bodyParser = require('koa-bodyparser')
const db = require('../utils/db')
const jwt = require('jsonwebtoken')

register.use(bodyParser());

register.post('/', async (ctx) => {
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
		// 能找到对应的账号,提示已经有相同账号
        ctx.body = {
            msg: '这个账号已经存在',
            account: myaccount,
            code:500
        };
	} else {
			// 找不到对应的账号，直接插入一个
            let regisResult = await new Promise((resolve, reject) => {
                // 生成token
                const token = jwt.sign({ myaccount: myaccount, mypwd: mypwd }, 'secret', { expiresIn: 3600 })
                return db.query(`INSERT INTO users (account, pwd, token) values ('${myaccount}', '${mypwd}', '${token}')`, (error, datas) => {
                    if (error) throw error;
                    // 已插入数据，返回用户名与token
                    let obj = {
                        token,
                        msg: '注册成功',
                        account: myaccount,
                        code:200
                    }
                    resolve(obj)
                })
            })
            if (regisResult) {
                ctx.body = regisResult;
            }
	}
})

module.exports = register;