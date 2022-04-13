// Express imports with types
import express, { Application, Response, Request, NextFunction, Router } from 'express';

import morganMiddleware from '../config/morganMiddleware';

import path from 'path';

// Function import to create ioRedis connection client


import dataRouter from './routes/data';

import Logger from "../config/logger";

export function startExpress(entry: NodeModule): express.Application {
    const app: Application = express();
    app.use('/data', dataRouter);
    app.use(morganMiddleware)

    // Call ioredis function
    //const redis = await createRedisClient();

    app.get('/', (req: Request, res: Response, next: NextFunction) => {
        res.send('Hello');
    });

    if (require.main === entry) {
        app.listen(3000, () => Logger.debug("Server running..."))
    }

    return app
};