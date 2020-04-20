import { Router } from 'express';
import DevController from './controllers/DevController';

const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

// routes.post('/devs/:devId/likes', LikeController.store);
// routes.post('/devs/:devId/dislikes', DislikeController.store);

export default routes;
