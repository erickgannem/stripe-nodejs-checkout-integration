import { Router } from 'express';
import PaymentController from './controllers/PaymentController';

const routes = Router();

routes.post('/payment_intent', PaymentController.create);

export default routes;
