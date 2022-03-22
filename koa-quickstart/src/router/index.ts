import Router from '@koa/router';
import login from './login';
import user from './user';
import visual from './visual';

const route = new Router();
route.use('/login', login.routes(), login.allowedMethods());
const unprotectedRouter = route;

const proRoute = new Router();
proRoute.use('/user', user.routes(), user.allowedMethods());
proRoute.use('/visual', visual.routes(), visual.allowedMethods());
const protectedRouter = proRoute;


export { protectedRouter, unprotectedRouter };
