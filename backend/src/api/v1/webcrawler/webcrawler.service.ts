import axios from 'axios';
import * as cheerio from 'cheerio';
import * as xml2js from 'xml2js';
import { ProductDetails, ProductVariant, CrawlerResponse } from './webcrawler.types';

export class WebCrawlerService {
  private async parseXML(xml: string): Promise<any> {
    const parser = new xml2js.Parser();
    return parser.parseStringPromise(xml);
  }

  private async getRobotsFile(baseUrl: string): Promise<string[]> {
    try {
      const response = await axios.get(`${baseUrl}/robots.txt`);
      const lines = response.data.split('\n');
      return lines
        .filter((line: string) => line.toLowerCase().startsWith('sitemap:'))
        .map((line: string) => line.split(': ')[1].trim());
    } catch (error) {
      console.error('Error fetching robots.txt:', error);
      return [`${baseUrl}/sitemap.xml`, `${baseUrl}/sitemap_index.xml`];
    }
  }

  private async fetchSitemap(url: string): Promise<any> {
    try {
      const response = await axios.get(url);
      return this.parseXML(response.data);
    } catch (error) {
      console.error(`Error fetching sitemap ${url}:`, error);
      return null;
    }
  }

  private extractProductUrls(sitemapData: any): Set<string> {
    const urls = new Set<string>();
    
    const traverse = (obj: any) => {
      if (!obj) return;
      
      if (Array.isArray(obj)) {
        obj.forEach(item => traverse(item));
      } else if (typeof obj === 'object') {
        if (obj.loc) {
          const url = obj.loc[0];
          if (url.includes('/products/') || url.includes('/collections/')) {
            urls.add(url);
          }
        }
        Object.values(obj).forEach(val => traverse(val));
      }
    };
    
    traverse(sitemapData);
    return urls;
  }

  private async extractProductDetails(url: string): Promise<ProductDetails | null> {
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      
      const product: ProductDetails = {
        url,
        name: '',
        price: '',
        images: [],
        description: '',
        variants: [],
        specifications: {},
        lastUpdated: new Date().toISOString()
      };

      // Try JSON-LD first
      const jsonLd = $('script[type="application/ld+json"]').contents().first().text();
      if (jsonLd) {
        try {
          const jsonLdData = JSON.parse(jsonLd);
          if (jsonLdData['@type'] === 'Product') {
            product.name = jsonLdData.name;
            product.description = jsonLdData.description;
            if (jsonLdData.offers) {
              product.price = jsonLdData.offers.price;
            }
            if (jsonLdData.image) {
              product.images = Array.isArray(jsonLdData.image) ? jsonLdData.image : [jsonLdData.image];
            }
          }
        } catch (e) {
          console.error('Error parsing JSON-LD:', e);
        }
      }

      // Fallback to HTML selectors
      if (!product.name) {
        product.name = $('h1').first().text().trim() ||
                      $('.product-title').first().text().trim() ||
                      $('.product-name').first().text().trim();
      }

      if (!product.price) {
        product.price = $('.price').first().text().trim() ||
                       $('.product-price').first().text().trim() ||
                       $('[data-price]').first().attr('data-price') || '';
      }

      if (product.images.length === 0) {
        $('img.product-image, .product-gallery img').each((i, el) => {
          const src = $(el).attr('src') || $(el).attr('data-src');
          if (src && !product.images.includes(src)) {
            product.images.push(src);
          }
        });
      }

      if (!product.description) {
        product.description = $('.product-description').text().trim() ||
                            $('#product-description').text().trim();
      }

      // Extract variants
      $('.variant-option, .product-variant').each((i, el) => {
        const variant: ProductVariant = {
          name: $(el).find('.variant-name').text().trim(),
          price: $(el).find('.variant-price').text().trim(),
          sku: $(el).attr('data-sku') || ''
        };
        if (variant.name || variant.price || variant.sku) {
          product.variants.push(variant);
        }
      });

      // Extract specifications
      $('.product-specifications tr, .product-attributes tr').each((i, el) => {
        const key = $(el).find('th').text().trim();
        const value = $(el).find('td').text().trim();
        if (key && value) {
          product.specifications[key] = value;
        }
      });

      return product;
    } catch (error) {
      console.error(`Error extracting details from ${url}:`, error);
      return null;
    }
  }

  public async crawlWebsite(url: string, maxProducts: number = 100): Promise<CrawlerResponse> {
    try {
      const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
      const sitemapUrls = await this.getRobotsFile(baseUrl);

      // Fetch all sitemaps in parallel
      const sitemapResults = await Promise.all(
        sitemapUrls.map(url => this.fetchSitemap(url))
      );

      console.log("SitemapResult:: ", JSON.stringify(sitemapResults, null, 2))

      // Extract product URLs
      const productUrls = new Set<string>();
      sitemapResults.forEach(sitemap => {
        if (sitemap) {
          const urls = this.extractProductUrls(sitemap);
          urls.forEach(url => productUrls.add(url));
        }
      });

      // Process products in parallel with limit
      const urlsToProcess = Array.from(productUrls).slice(0, maxProducts);
      const productPromises = urlsToProcess.map(url => this.extractProductDetails(url));
      const products = await Promise.all(productPromises);

      const validProducts = products.filter((p): p is ProductDetails => p !== null);

      return {
        success: true,
        totalProducts: validProducts.length,
        products: validProducts
      };

    } catch (error) {
      console.error('Error crawling website:', error);
      throw error;
    }
  }
}