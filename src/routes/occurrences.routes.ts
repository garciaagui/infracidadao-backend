import { Router } from 'express';
import multer from 'multer';
import OccurrenceController from '../controllers/occurrence.controller';

const routers = Router();
const controller = new OccurrenceController();

const multerMiddleware = multer();

routers.post('/', multerMiddleware.any(), (res, req, next) =>
  controller.create(res, req, next)
);

routers.get('/', (res, req, next) => controller.findAll(res, req, next));

export default routers;
