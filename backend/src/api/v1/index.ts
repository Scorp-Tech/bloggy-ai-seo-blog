import { Router } from 'express';
import { infoRouter } from './info/info.routes';
import { blogRouter } from './blog/blog.routes';
import { webCrawler } from './webcrawler/webcrawler.routes';

const router = Router();

router.use('/info', infoRouter);
router.use('/blog', blogRouter);
router.use('/crewl', webCrawler)

export { router as apiV1Router };