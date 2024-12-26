import { Block, PostTitle } from "./types";

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


export type WpPostTypeDocument = {
  id: string;
  rowID: number;
  slug: string;
  title: string,
  blocks: Block[];
  content: PostTitle;
  flatsome_blocks?: Element;
}