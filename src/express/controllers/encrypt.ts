import { scryptSync, createCipheriv, createDecipheriv } from "crypto";

import { Response, Request, NextFunction } from 'express';

import Logger from '../../config/logger';

import busboy from "busboy";

export const encryptView: any = function (req: Request, res: Response, next: NextFunction) {
    res.send("encryptView file route")
}

export const encrypt: any = function (req: Request, res: Response, next: NextFunction) {

    //const { isFileEncrypted } = req.headers;
    const algorithm: string = "aes-192-cbc";
    const iv = Buffer.alloc(16, 0);

    const key = scryptSync("password", "salt", 24);
    const cipher = createCipheriv(algorithm, key, iv);
    
    var encryptedText = '';

    console.log('POST request');
    const bb = busboy({ headers: req.headers });
    bb.on('file', (name, file, info) => {
        const { filename, encoding, mimeType } = info;
        console.log(
            `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
            filename,
            encoding,
            mimeType
        );
        file.on('data', (data) => {
            console.log(`File [${name}] got ${data.length} bytes`);
            //Logger.debug(data.toString());
            encryptedText += cipher.update(data.toString("utf8"), "utf8", "hex")
        }).on('close', () => {
            console.log(`File [${name}] done`);
            encryptedText += cipher.final('hex');
            res.send(encryptedText);
        });
    });

    bb.on('field', (name, val, info) => {
        console.log(`Field [${name}]: value: %j`, val);
    });
    bb.on('close', () => {
        console.log('Done parsing form!');
        res.writeHead(303, { Connection: 'close', Location: '/' });
        res.end();
    });
    req.pipe(bb);
    
};

export const decrypt: any = function (req: Request, res: Response, next: NextFunction) {

    var algorithm = 'aes-192-cbc';
    const iv = Buffer.alloc(16, 0);
    const key = scryptSync("password", "salt", 24);

    var decipher = createDecipheriv(algorithm, key, iv);

    var decryptedText = '';

    console.log('POST request');
    const bb = busboy({ headers: req.headers });
    bb.on('file', (name, file, info) => {
        const { filename, encoding, mimeType } = info;
        console.log(
            `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
            filename,
            encoding,
            mimeType
        );

        file.on('data', (data) => {
            console.log(`File [${name}] got ${data.length} bytes`);
            decryptedText += decipher.update(data.toString("utf8"), 'hex', "utf8");

        }).on('close', () => {
            console.log(`File [${name}] done`);
            decryptedText += decipher.final('utf8');
            res.send(decryptedText);
        });
    });
    bb.on('field', (name, val, info) => {
        console.log(`Field [${name}]: value: %j`, val);
    });

    bb.on('close', () => {
        console.log('Done parsing form!');
        res.writeHead(303, { Connection: 'close', Location: '/' });
        res.end();
    });
    req.pipe(bb);
};


