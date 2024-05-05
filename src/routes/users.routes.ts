import { Router } from 'express';
import UserController from '../controllers/user.controller';

const routers = Router();
const controller = new UserController();

routers.get('/', (res, req, next) => controller.findAll(res, req, next));
routers.post('/auth/login', (res, req, next) =>
  controller.login(res, req, next)
);

export default routers;
