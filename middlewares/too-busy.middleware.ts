import { NextFunction, Request, Response } from 'express';
import busy from 'toobusy-js';

export function tooBusy(req: Request, res: Response, next: NextFunction): void {
  if (busy()) {
    return res.status(503).end('tooBusy');
  }

  next();
}
