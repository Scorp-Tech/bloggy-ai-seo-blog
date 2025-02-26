import { Request, Response } from 'express';
import { WebCrawlerService } from './webcrawler.service';

export class WebCrawlerController {
  private crawlerService: WebCrawlerService;

  constructor() {
    this.crawlerService = new WebCrawlerService();
  }

  crawlWebsite = async (req: Request, res: Response): Promise<void> => {
    try {
      const { url, maxProducts } = req.body;

      if (!url) {
        res.status(400).json({ error: 'URL is required' });
        return;
      }

      const result = await this.crawlerService.crawlWebsite(url, maxProducts);
      res.json(result);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({
        error: 'Failed to crawl website',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}