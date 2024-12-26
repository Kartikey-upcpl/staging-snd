export type PriceRange = {
  min_amount: string;
  max_amount: string;
};

export type Prices = {
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
  price: string;
  regular_price: string;
  sale_price: string;
  price_range: PriceRange | null;
};

export type Image = {
  id: number;
  src: string;
  thumbnail: string;
  srcset: string;
  sizes: string;
  name: string;
  alt: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  link: string;
};

export type Tag = {
  id: number;
  name: string;
  slug: string;
  link: string;
};

export type AttributeTerm = {
  id: number;
  name: string;
  slug: string;
  default: boolean;
};

export type Attribute = {
  id: number;
  name: string;
  taxonomy: string | null;
  has_variations: boolean;
  terms: AttributeTerm[];
};

export type VariationAttribute = {
  name: string;
  value: string;
};

export type Variation = {
  id: number;
  attributes: VariationAttribute[];
};

export type AddToCart = {
  text: string;
  description: string;
  url: string;
  minimum: number;
  maximum: number;
  multiple_of: number;
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  parent: number;
  type: string;
  variation: string;
  permalink: string;
  short_description: string;
  description: string;
  on_sale: boolean;
  sku: string;
  prices: Prices;
  price_html: string;
  average_rating: string;
  review_count: number;
  images: Image[];
  categories: Category[];
  tags: Tag[];
  attributes: Attribute[];
  variations: Variation[];
  has_options: boolean;
  is_purchasable: boolean;
  is_in_stock: boolean;
  is_on_backorder: boolean;
  low_stock_remaining: number | null;
  sold_individually: boolean;
  add_to_cart: AddToCart;
  extensions: Record<string, any>;
};

export type Document = Omit<Product, 'id'> & {
  id: string;
  rowID: number;
};

export type TypesenseHit<T> = {
  document: T;
  highlights: Array<{
    field: string;
    snippet: string;
    value: string;
  }>;
  text_match: number;
};

export type TypesenseFacetCount = {
  counts: Array<{
    count: number;
    highlighted: string;
    value: string;
  }>;
  field_name: string;
  stats: {
    avg: number;
    max: number;
    min: number;
    sum: number;
  };
};

export type TypesenseResponse<T> = {
  facet_counts: TypesenseFacetCount[];
  found: number;
  hits: TypesenseHit<T>[];
  out_of: number;
  page: number;
  request_params: {
    collection_name: string;
    per_page: number;
    q: string;
    query_by: string;
  };
  search_time_ms: number;
  search_cutoff: boolean;
};

export type TypesenseSearchParameters = {
  q: string; // The search query
  query_by: string; // Comma-separated list of fields to query
  filter_by?: string; // Filter conditions
  sort_by?: string; // Sorting criteria
  max_hits?: number; // Maximum number of hits to return
  page?: number; // Page number for pagination
  per_page?: number; // Number of results per page
  facet_by?: string; // Comma-separated list of fields to facet by
  facet_query?: string; // Facet query
  include_fields?: string; // Comma-separated list of fields to include in the result
  exclude_fields?: string; // Comma-separated list of fields to exclude from the result
  highlight_fields?: string; // Comma-separated list of fields to highlight
  highlight_full_fields?: string; // Comma-separated list of fields to fully highlight
  highlight_affix_num_tokens?: number; // Number of tokens to include before and after the highlighted text
  highlight_start_tag?: string; // Tag to use for the start of the highlighted text
  highlight_end_tag?: string; // Tag to use for the end of the highlighted text
  snippet_threshold?: number; // Minimum number of characters to include in the snippet
  num_typos?: number; // Number of typos to allow in the search query
  typo_tokens_threshold?: number; // Minimum number of tokens to allow typos in
  drop_tokens_threshold?: number; // Minimum number of tokens to drop from the search query
  pinned_hits?: string; // Comma-separated list of document IDs to pin at the top of the search results
  hidden_hits?: string; // Comma-separated list of document IDs to hide from the search results
  pre_segmented_query?: boolean; // Whether the query is pre-segmented
  exhaustive_search?: boolean; // Whether to perform an exhaustive search
  search_cutoff_ms?: number; // Maximum time in milliseconds to spend on the search
  use_cache?: boolean; // Whether to use the cache
  cache_ttl?: number; // Time-to-live for the cache in seconds
};
