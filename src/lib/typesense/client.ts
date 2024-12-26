import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    nodes: [
      {
        host: process.env.NEXT_PUBLIC_TYPESENSE_HOST || 'localhost',
        port: process.env.NEXT_PUBLIC_TYPESENSE_PORT ? parseInt(process.env.NEXT_PUBLIC_TYPESENSE_PORT) : 8108,
        protocol: process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL || 'http'
      }
    ],
    apiKey: process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY || '',
  },
  additionalSearchParameters: {
    // The following parameters are directly passed to Typesense's search API endpoint.
    //  So you can pass any parameters supported by the search endpoint below.
    //  queryBy is required.
    query_by: 'name',
    // queryByWeights: '4,2,1',
    // num_typos: 1,
    // typoTokensThreshold: 1,
    // groupBy: "categories",
    // groupLimit: 1
    // pinnedHits: "23:2"
    sort_by: 'rowID:desc',
    per_page: 12
  }
});

export const searchClient = typesenseInstantsearchAdapter.searchClient;
export const typesenseClient = typesenseInstantsearchAdapter.typesenseClient;
