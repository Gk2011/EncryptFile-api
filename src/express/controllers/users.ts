import express, { Application, Response, Request, NextFunction, RequestHandler } from 'express';

// export const getData: any = function (req: Request, res: Response, next: NextFunction) {
//     return res.send(`This is not Redis data. Data`);
// }

export const userView: any = function (req: Request, res: Response, next: NextFunction) {
    return res.send("userView route")
}

export const loginUser: any = function (req: Request, res: Response, next: NextFunction) {
    return res.send("login route")
}

export const logoutUser: any = function (req: Request, res: Response, next: NextFunction) {
    return res.send("Logout route")
}

export const createUser: any = function (req: Request, res: Response, next: NextFunction) {
    return res.send("create user route")
}

export const deleteUser: any = function (req: Request, res: Response, next: NextFunction) {
    return res.send("deleteUser route")
}
