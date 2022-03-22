import Router from '@koa/router';
import AuthController from '../controllers/login';

const login = new Router();

// 登录相关的路由
login.post('/', AuthController.login);
login.post('/register', AuthController.register);

export default login;