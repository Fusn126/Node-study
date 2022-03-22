import Router from '@koa/router';

import UserController from '../controllers/user';

const router = new Router();

// users 相关的路由
router.get('/', UserController.listUsers);
router.get('/:id', UserController.showUserDetail);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.post('/add', UserController.addUser);

export default router;