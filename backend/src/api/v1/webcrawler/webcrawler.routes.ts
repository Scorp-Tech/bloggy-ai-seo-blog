import { Router } from 'express';
import { WebCrawlerController } from './webcrawler.controller';

const router = Router();
const controller = new WebCrawlerController();

router.post('/', controller.crawlWebsite);

export { router as webCrawler };