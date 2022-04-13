import express, { Application, Response, Request, NextFunction, RequestHandler } from 'express';

import { redisClient } from '../../redis/connectRedis';

import Logger from "../../config/logger";

export const checkCache: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    (await redisClient).get("mykey", (err, value) => {
        if (err) {
            Logger.warn("Redis Database not available")
            Logger.error(err)
            next()
        } else if (value !== null) {
            res.send(`This is Redis data! ${value}`);
        } else {
            next()
        }
    })
}


