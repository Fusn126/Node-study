//这个文件存放所有关于list的接口
const Router = require('koa-router');
const list = new Router();

list.get('/', async (ctx)=>{
    ctx.body = 114514;
})
list.get('/child', async (ctx)=>{
    ctx.body = "列表页/婴儿";
})
list.get('/toy', async (ctx)=>{
    ctx.body = "列表页/玩具";
})

module.exports = list;