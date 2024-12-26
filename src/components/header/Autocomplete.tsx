'use client'

import { autocomplete } from '@algolia/autocomplete-js';
import { typesenseClient } from '@/lib/typesense/client';
import React, { createElement, Fragment, useEffect, useRef } from 'react';
import { createRoot, Root } from 'react-dom/client';
// import { unescapeHTML } from "@/utlis/string";

export default function Autocomplete() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelRootRef = useRef<Root | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const search = autocomplete({
      container: containerRef.current,
      placeholder: 'Search for products...',
      openOnFocus: true,
      insights: true,
      plugins: [
        // {
        //   name: 'aa.querySuggestionsPlugin',
        //   getSources: async function getSources(_ref) {
        //     const results: any = await typesenseClient.collections('wc_products').documents().search(
        //       {
        //         q: _ref.query,
        //         query_by: 'name',
        //         highlight_full_fields: 'name',
        //         include_fields: 'name,images,id,slug,price_html',
        //         per_page: 5,
        //       },
        //       {}
        //     );
        //     return [
        //       {
        //         sourceId: 'querySuggestionsPlugin',
        //         getItems() {
        //           return results.hits;
        //         },
        //         getItemInputValue({ item }) {
        //           return (item.document as any).name;
        //         },
        //         templates: {
        //           item({ item, html }) {
        //             // Get the highlighted HTML fragment from Typesense results
        //             const html_fragment = html`${(item as any).highlights.find(
        //               (h: any) => h.field === 'name' || {}
        //             )?.value || (item.document as any)['name']}`;

        //             return (
        //               <div className='flex items-center gap-2 py-1'>
        //                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
        //                   <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        //                 </svg>
        //                 <span className='flex-1 items-center text-sm' dangerouslySetInnerHTML={{__html: html_fragment}} />
        //                 <button
        //                   className="size-4 text-gray-400 hover:text-gray-900"
        //                   onClick={(e) => {
        //                     e.preventDefault();
        //                     e.stopPropagation();
        //                     _ref.setQuery("".concat(unescapeHTML((item.document as any).name), " "));
        //                     _ref.refresh();
        //                   }}
        //                 >
        //                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        //                     <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 19.5-15-15m0 0v11.25m0-11.25h11.25" />
        //                   </svg>
        //                 </button>
        //               </div>
        //             );
        //           },
        //         },
        //       }
        //     ];
        //   },

        // }
      ],
      renderer: { createElement, Fragment, render: () => { } },
      render({ children }, root) {
        if (!panelRootRef.current || rootRef.current !== root) {
          rootRef.current = root;

          panelRootRef.current?.unmount();
          panelRootRef.current = createRoot(root);
        }

        panelRootRef.current.render(children);
      },
      async getSources({ query }) {
        if (!query) {
          return [];
        }
        const results: any = await typesenseClient.collections('wc_products').documents().search(
          {
            q: query,
            query_by: 'name',
            highlight_full_fields: 'name',
            include_fields: 'name,images,id,slug,price_html'
          },
          {}
        );
        return [
          {
            sourceId: 'predictions',
            getItems() {
              return results.hits;
            },
            getItemInputValue({ item }) {
              return (item.document as any).name;
            },
            templates: {
              header() {
                return (
                  <Fragment>
                    <span className="aa-SourceHeaderTitle !text-pink-600">Products</span>
                    <div className="aa-SourceHeaderLine !border-b-pink-600" />
                  </Fragment>
                );
              },
              item({ item, html }) {
                // Get the highlighted HTML fragment from Typesense results
                const html_fragment = html`${(item as any).highlights.find(
                  (h: any) => h.field === 'name' || {}
                )?.value || (item.document as any)['name']}`;

                const image = (item.document as any).images[0]?.thumbnail ?? '';
                const link = `/product/${(item.document as any).slug}`;

                // Send the html_fragment to `html` tagged template
                // Reference: https://github.com/developit/htm/issues/226#issuecomment-1205526098
                return html`
                  <a className="px-1 py-2 flex gap-4 items-center" href="${link}">
                    <img src="${image}" alt="${(item.document as any).name}" width="50" />
                    <div className="flex-1">
                      <h5 className="text-sm font-medium" dangerouslySetInnerHTML=${{ __html: html_fragment }}/>
                      <p className="mt-1 current-price text-sm" dangerouslySetInnerHTML=${{ __html: (item.document as any).price_html }} />
                    </div>
                  </a>
                `;
              },
              noResults() {
                return 'No results found.';
              }
            },
            getItemUrl({ item }) {
              return `/product/${item.id}`;
            }
          }
        ];
      },
      classNames: {
        root: "",
        form: "border-0 focus-within:!shadow-none",
        input: "!text-gray-900",
        submitButton: "[&_svg]:!text-gray-900",
        clearButton: "[&_svg]:!text-gray-400 [&_svg]:hover:!text-gray-900",
        item: "text-gray-900 hover:!bg-gray-100",
      }
    });

    return () => {
      search.destroy();
    };
  }, []);

  return <div className='header-search__input w-100 z-50 !ml-0' ref={containerRef} />;
}
