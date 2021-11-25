import { v4 as uuidV4} from 'uuid';
import { Request, Response } from 'express';

export const requestIdMiddleware = (req: Request, res: Response, next: () => void): void => {
    if (!req.headers['lovechain-admin-request-id']) {
        req.headers['lovechain-admin-request-id'] = uuidV4().toString();
    }
    next();
};
