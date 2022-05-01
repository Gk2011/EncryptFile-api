// Express imports with types
import express, { Application, Response, Request, NextFunction, Router } from 'express';

import morganMiddleware from '../config/morganMiddleware';

import bodyParser from 'body-parser';

import path from 'path';

// Function import to create ioRedis connection client

import encryptRouter from './routes/encrypt';

import usersRouter from './routes/users';

import Logger from "../config/logger";

export function startExpress(entry: NodeModule): express.Application {
    const app: Application = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/users', usersRouter);

    app.use('/encrypt', encryptRouter);

    app.use(morganMiddleware);

    // Call ioredis function
    //const redis = await createRedisClient();

    app.get('/*', (req: Request, res: Response, next: NextFunction) => {
        res.status(404).send('404, URL not found');
    });

    if (require.main === entry) {
        app.listen(3000, () => Logger.debug("Server running..."))
    }

    return app
};