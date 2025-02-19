import { Router } from 'express';
import { infoRouter } from './info/info.routes';
import { blogRouter } from './blog/blog.routes';

const router = Router();

router.use('/info', infoRouter);
router.use('/blog', blogRouter);

export { router as apiV1Router };