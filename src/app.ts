import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';

class App {
  server: express.Application

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  routes() {
    this.server.use(routes);
  }

  middlewares() {
    this.server.use(morgan('tiny'));
    this.server.use(cors());
    this.server.use(express.json());
  }
}

const app = new App();

export default app;
