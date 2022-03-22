const Router = require('koa-router'); //引入路由
const router = new Router();
const list = require('./list'); //引入list的中间件路由
const home = require('./home')
const login = require('./login')
const register = require('./register')

router.use('/list', list.routes(), list.allowedMethods());
router.use('/home', home.routes(), home.allowedMethods());
router.use('/login', login.routes(), login.allowedMethods());
router.use('/register', register.routes(), register.allowedMethods());

router.redirect('/', '/home');

module.exports = router;