import { scryptSync, createCipheriv, createDecipheriv } from "crypto";

import { Response, Request, NextFunction } from 'express';

import Logger from '../../config/logger';

import busboy from "busboy";



export const encryptView: any = function (req: Request, res: Response, next: NextFunction) {
    res.send("encryptView file route")
}

// Takes file and encrypts using password provided by user, sends file back to client.
export const encrypt: any = function (req: Request, res: Response, next: NextFunction) {

    var { reqpassword } = req.headers;
    var content_Type = req.headers['content-type'];
    Logger.debug(`content-type is ${content_Type}`)
    // Returns if no password is provided
    if (reqpassword == undefined) {
        return res.send("Please provide a password for file encryption.")
    } else {
        try {
            Logger.debug(`reqPassword is ${reqpassword}`)

                //const password: String = reqpassword.toString();

                // Create cipher components and cipher object
                const algorithm: string = "aes-192-cbc";
                const iv = Buffer.alloc(16, 0);

                const key = scryptSync(Buffer.from(reqpassword.toString()), "salt", 24);
                const cipher = createCipheriv(algorithm, key, iv);

                var encryptedText = '';

                const bb = busboy({ headers: req.headers });

                bb.on('file', (name, file, info) => {
                    const { filename, encoding, mimeType } = info;
                    Logger.debug(`Info contains ${info.mimeType}`);
                    console.log(
                        `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
                        filename,
                        encoding,
                        mimeType
                    );

                    file.on('data', (data) => {
                        console.log(`File [${name}] got ${data.length} bytes`);
                        encryptedText += cipher.update(data.toString("utf8"), "utf8", "hex")
                    }).on('close', () => {
                        console.log(`File [${name}] done`);
                        encryptedText += cipher.final('hex');
                        res.send(encryptedText);
                    });
                });

                // bb.on('close', () => {
                //     console.log('Done parsing form!');
                //     res.writeHead(303, { Connection: 'close', Location: '/' });
                //     res.end(encryptedText);
                // });
                req.pipe(bb);
            
        } catch (e: unknown) {
            Logger.error(e);
            res.end("Something went wrong!")
        }
    }
};

export const decrypt: any = function (req: Request, res: Response, next: NextFunction) {
    var { reqpassword } = req.headers;
    var content_Type = req.headers['content-type'];
    Logger.debug(`content-type is ${content_Type}`)

    if (reqpassword == undefined) {
        return res.send("no password detected, unable to decryt")
    } else {
        try {
            const password: String = reqpassword.toString();
            var algorithm = 'aes-192-cbc';

            const iv = Buffer.alloc(16, 0);
            const key = scryptSync(Buffer.from(password), "salt", 24);

            var decipher = createDecipheriv(algorithm, key, iv);
            var decryptedText = '';

            //console.log('POST request');


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
                    try {
                        decryptedText += decipher.update(data.toString("utf8"), 'hex', "utf8");

                    } catch (err: unknown) {
                        Logger.error(`Decryption fail detected ${err}`);
                    };

                }).on('close', () => {
                    console.log(`File [${name}] done`);
                    try {
                        decryptedText += decipher.final('utf8');
                    } catch (e) {
                        Logger.error(`Decryption fail detected ${e}`);
                        return res.end("Decryption Failed")
                    }
                    return res.send(decryptedText);
                });

            });
            // bb.on('field', (name, val, info) => {
            //     console.log(`Field [${name}]: value: %j`, val);
            // });

            bb.on('close', () => {
                console.log('Done parsing form!');
                res.writeHead(303, { Connection: 'close', Location: '/' });
            });

            //     res.end(decryptedText);
            // });

            req.pipe(bb);


        } catch (e: unknown) {
            Logger.error(e);
            res.end("Something went wrong!")
        }
    }
};


