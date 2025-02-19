import { Request, Response } from 'express';

export class InfoController {
  getHello(req: Request, res: Response) {
    res.json({ message: 'Hello, World!' });
  }

  getVersion(req: Request, res: Response) {
    res.json({
      version: '1.0.0',
      details: {
        name: 'Blog API',
        environment: process.env.NODE_ENV,
        nodeVersion: process.version,
      },
    });
  }
}