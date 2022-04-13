// import express, { Application, Response, Request, NextFunction } from 'express';

// const app: Application = express();

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//     res.send('Hello');
// });


import Logger from "./config/logger";

import express, { Application } from 'express';

import { startExpress } from "./express/startExpress";

Logger.error("This is an error log");
Logger.warn("This is a warn log");
Logger.info("This is a info log");
Logger.http("This is a http log");
Logger.debug("This is a debug log\n");

export async function startApp() {

    Logger.debug("Attempting to start Express Server...")
    const expressApp: Application = startExpress(module)
}

startApp();

