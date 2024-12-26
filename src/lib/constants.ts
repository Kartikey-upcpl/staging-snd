export const WEBSITE_TITLE = 'Premium Baby & Kids Products | StarAndDaisy Buy Baby Products';
export const WEBSITE_DESCRIPTION = 'Buy Premium Quality Baby & kids products online India at StarandDaisy.in. One-stop shops for baby gear products are available at best Price.';

export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE' | 'price';
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  title: 'Relevance',
  slug: null,
  sortKey: 'RELEVANCE',
  reverse: false
};

export const sorting: SortFilterItem[] = [
  defaultSort,
//   { title: 'Trending', slug: 'trending-desc', sortKey: 'BEST_SELLING', reverse: false }, // asc
//   { title: 'Latest arrivals', slug: 'latest-desc', sortKey: 'CREATED_AT', reverse: true },
  { title: 'Price: Low to high', slug: 'price-asc', sortKey: 'price', reverse: false }, // asc
  { title: 'Price: High to low', slug: 'price-desc', sortKey: 'price', reverse: true }
];

export const TAGS = {
  collections: 'collections',
  products: 'products',
  cart: 'cart',
  addresses: 'addresses',
  settings: 'settings',
  payment_methods: 'payment_methods',
};

export const HIDDEN_PRODUCT_TAG = 'nextjs-frontend-hidden';
export const DEFAULT_OPTION = 'Default Title';
export const SHOPIFY_GRAPHQL_API_ENDPOINT = '/api/2023-01/graphql.json';

export const PRODUCT_COLLECTIONS = process.env.NEXT_PUBLIC_PRODUCTS_COLLECTION_NAME ?? 'wc_products';
export const PRODUCT_META_COLLECTIONS = process.env.NEXT_PUBLIC_PRODUCTS_META_COLLECTION_NAME ?? 'wc_products_meta';
export const CATEGORY_COLLECTIONS = process.env.NEXT_PUBLIC_CATEGORIES_COLLECTION_NAME ?? 'wc_categories';
export const TAG_COLLECTIONS = process.env.NEXT_PUBLIC_TAGS_COLLECTION_NAME ?? 'wc_tags';
export const BRAND_COLLECTIONS = process.env.NEXT_PUBLIC_BRANDS_COLLECTION_NAME ?? 'wc_brand';
export const PAGE_COLLECTIONS = process.env.NEXT_PUBLIC_PAGES_COLLECTION_NAME ?? 'wp_pages';
export const POST_COLLECTIONS = process.env.NEXT_PUBLIC_POSTS_COLLECTION_NAME ?? 'wp_posts';

export const PAYMENT_METHODS_SUPPORTED = ['cod', 'wallet', 'razorpay', 'cheque', 'bacs'];

