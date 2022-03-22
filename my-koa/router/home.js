const Router = require('koa-router');
const home = new Router();
const db =require('../utils/db')

// 这里的 '/' 就是指向 index.js 中的 /home
home.get('/', async (ctx) => {
	let message={
		result:'首页',
		code: 200
	}
	ctx.body = message;
})

home.get('/banner', async (ctx) => {
	let mydata=await new Promise((resolve,reject)=>{
		db.query('select * from banner' , (err, data)=>{
			if(err) throw err
			data.map(item=>{
				item.imgUrl = 'http://localhost:5050'+item.imgUrl
			})
			resolve(data)
		})
	})
	ctx.body = mydata
})

module.exports = home;
