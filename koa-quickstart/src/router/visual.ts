import Router from '@koa/router';
const visual = new Router();
import VirualController from '../controllers/visual';

visual.get('/',VirualController.log);

export default visual;