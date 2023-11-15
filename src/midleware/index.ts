import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LowercaseMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Loop through the request body and convert all non-password fields to lowercase
    for (const key in req.body) {
      if (key !== 'password' && key != 'confPassword' && typeof req.body[key] === 'string') {
        req.body[key] = req.body[key].toLowerCase();
      }
    }
    next();
  }
}
