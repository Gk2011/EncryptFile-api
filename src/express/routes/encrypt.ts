import { encrypt, decrypt, encryptView } from "../controllers/encrypt"

import express, { Application, Response, Request, NextFunction, Router } from 'express';

import morganMiddleware from '../../config/morganMiddleware';
import multer from "multer";


const storage = multer.memoryStorage()
const upload = multer({ storage: storage});

var router = express.Router();

router.get("/", morganMiddleware, encryptView);

router.post("/encrypt", morganMiddleware, encrypt);

router.post("/decrypt", morganMiddleware, decrypt);



//router.get("/*", morganMiddleware, (req: Request, res: Response, next: NextFunction) => { return res.redirect("/users/login") });

export default router