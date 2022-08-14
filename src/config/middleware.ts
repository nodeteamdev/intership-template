import {
  Request, Response, NextFunction, Application,
} from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import errorHandlers from '../error/errorHandlers';

export default {
  /**
     * @function
     * @description express middleware
     * @param {express.Application} app
     * @returns void
     */
  init(app: Application): void {
    app.use(bodyParser.urlencoded({
      extended: false,
    }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(compression());
    app.use(helmet());
    app.use(cors());
    app.use((req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With,'
                + ' Content-Type, Accept,'
                + ' Authorization,'
                + ' Access-Control-Allow-Credentials',
      );
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    });
  },
  errors(app: Application): void {
    app.use(errorHandlers.logErrors);
    app.use(errorHandlers.clientErrorHandler);
    app.use(errorHandlers.errorHandler);
  },

};
