import { Router } from 'express';
import OccurrenceReplyController from '../controllers/occurrenceReply.controller';
import multerMiddleware from '../middlewares/multerMiddleware';

const routers = Router();
const controller = new OccurrenceReplyController();

routers.post('/', multerMiddleware.any(), (res, req, next) =>
  controller.create(res, req, next)
);

routers.get('/occurrences/:id', (res, req, next) =>
  controller.findByOccurrenceId(res, req, next)
);

export default routers;
