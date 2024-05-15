import { Router } from 'express';
import OccurrenceController from '../controllers/occurrence.controller';
import multerMiddleware from '../middlewares/multerMiddleware';

const routers = Router();
const controller = new OccurrenceController();

routers.post('/', multerMiddleware.any(), (res, req, next) =>
  controller.create(res, req, next)
);

routers.get('/', (res, req, next) => controller.findAll(res, req, next));
routers.get('/:id', (res, req, next) => controller.findById(res, req, next));

export default routers;
