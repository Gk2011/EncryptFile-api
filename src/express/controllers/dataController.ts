import express, { Application, Response, Request, NextFunction, RequestHandler } from 'express';

export const getData: any = function (req: Request, res: Response, next: NextFunction) {
    return res.send(`This is not Redis data. Data`);
}
