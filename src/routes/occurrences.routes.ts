import { Router } from 'express';
import OccurrenceController from '../controllers/occurrence.controller';

const routers = Router();
const controller = new OccurrenceController();

routers.post('/', (res, req, next) => controller.create(res, req, next));
routers.get('/', (res, req, next) => controller.findAll(res, req, next));

export default routers;
