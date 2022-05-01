import express, { Application, Response, Request, NextFunction, Router } from 'express';

var router = express.Router();

import morganMiddleware from '../../config/morganMiddleware';
import { createUser, deleteUser, loginUser, logoutUser, userView } from '../controllers/users';

//import { getData } from '../controllers/dataController';

//import { checkCache } from '../util/checkCache';

//router.get('/', morganMiddleware, checkCache, getData);

router.get("/", morganMiddleware, loginUser, userView);

router.get("/login", morganMiddleware, loginUser);

router.get("/logout", morganMiddleware, logoutUser);

router.get("/delete", morganMiddleware, deleteUser);

router.get("/create", morganMiddleware, createUser);



export default router;


