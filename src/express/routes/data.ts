import express, { Application, Response, Request, NextFunction, Router } from 'express';

var router = express.Router();

import morganMiddleware from '../../config/morganMiddleware';

import { getData } from '../controllers/dataController';

import { checkCache } from '../util/checkCache';

router.get('/', morganMiddleware, checkCache, getData);

export default router;


