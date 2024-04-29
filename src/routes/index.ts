import { Router } from 'express';
import occurrencesRoutes from './occurrences.routes';
import usersRoutes from './users.routes';

const routes = Router();

routes.use('/occurrences', occurrencesRoutes);
routes.use('/users', usersRoutes);

export default routes;
