import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'express-async-errors';
import dotenv from 'dotenv';
import Youch from 'youch';

import routes from './routes';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
    if (process.env.NODE_ENV !== 'production') {
      dotenv.config({
        path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
      });
    }
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(bodyParser.json());
    this.server.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      const errors = await new Youch(err, req).toJSON();

      return res.status(500).json({ message: errors.error.message });
    });
  }
}

export default new App().server;
