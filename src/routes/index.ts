import { Router } from 'express';
import occurrenceReplyRoutes from './occurrenceReply.routes';
import occurrencesRoutes from './occurrences.routes';
import usersRoutes from './users.routes';

const routes = Router();

routes.use('/occurrences', occurrencesRoutes);
routes.use('/occurrence-reply', occurrenceReplyRoutes);
routes.use('/users', usersRoutes);

export default routes;
