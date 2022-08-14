import express, { Application } from 'express';
import middleware from '../config/middleware';
import routes from '../config/router';

const app: Application = express();

middleware.init(app);

routes.init(app);

app.set('port', process.env.PORT || 3000);

export default app;
