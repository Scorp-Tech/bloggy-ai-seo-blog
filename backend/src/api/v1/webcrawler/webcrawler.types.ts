export interface ProductDetails {
    url: string;
    name: string;
    price: string;
    images: string[];
    description: string;
    variants: ProductVariant[];
    specifications: Record<string, string>;
    lastUpdated: string;
}

export interface ProductVariant {
    name: string;
    price: string;
    sku: string;
}

export interface CrawlerResponse {
    success: boolean;
    totalProducts: number;
    products: ProductDetails[];
}