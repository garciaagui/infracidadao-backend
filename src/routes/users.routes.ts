import { Router } from 'express';
import UserController from '../controllers/user.controller';

const routers = Router();
const controller = new UserController();

routers.get('/', (res, req, next) => controller.findAll(res, req, next));

export default routers;
