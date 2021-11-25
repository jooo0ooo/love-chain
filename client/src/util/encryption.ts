import * as crypto from 'crypto';

export const pbkdf2Async = (password: string, salt: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, key) => {
            if (err){
                reject(err);
            }
            resolve(key.toString('base64'));
        })
    });
};
