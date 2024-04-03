import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { dataFromDTO } from '../utils/DTO';
import { dataSearchFromDTO } from '../utils/DTO-search';
import type { Data } from '../utils/DTO';
import type { DataSearch } from '../utils/DTO-search';

type ResponseBooksFiction = {
    status: string,
    copyright: string,
    num_results: number,
    last_modified: string,
    results: {
        list_name: string,
        list_name_encoded: string,
        bestsellers_date: string,
        published_date: string,
        published_date_description: string,
        next_published_date: string,
        previous_published_date: string,
        display_name: string,
        normal_list_ends_at: number,
        updated: string,
        books: {
            rank: number,
            rank_last_week: number,
            weeks_on_list: number,
            asterisk: number,
            dagger: number,
            primary_isbn10: string,
            primary_isbn13: string,
            publisher: string,
            description: string,
            price: number | string,
            title: string,
            author: string,
            contributor: string,
            contributor_note: string,
            book_image: string,
            book_image_width: number,
            book_image_height: number,
            amazon_product_url: string,
            age_group: string,
            book_review_link: string,
            first_chapter_link: string,
            sunday_review_link: string,
            article_chapter_link: string,
            isbns: {
                isbn10: string | number,
                isbn13: string | number,
            }[],
            buy_links: {
                name: string,
                url: string,
            }[],
            ook_uri: string
        }[],
    }
    corrections: []
}

type ResponseSearch = {
    status: string,
    copyright: string,
    num_results: number,
    results: {
        title: string,
        description: string,
        contributor: string,
        author: string,
        contributor_note: string,
        price: number,
        age_group: string,
        publisher: string,
        isbns: {
            isbn10: string,
            isbn13: string
        }[],
        ranks_history: {
            primary_isbn10: string | number,
            primary_isbn13: string | number,
            rank: number,
            list_name: string,
            display_name: string,
            published_date: string,
            bestsellers_date: string,
            weeks_on_list: number,
            ranks_last_week: string | number,
            asterisk: number,
            dagger: number
        }[],
        reviews:
        {
            book_review_link: string,
            first_chapter_link: string,
            sunday_review_link: string,
            article_chapter_link: string
        }[]
    }[]
}

export const booksAPI = createApi({
    reducerPath: 'booksAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.nytimes.com/svc/books/v3/lists' }),
    endpoints: builder => ({
        getBooksFiction: builder.query<Data[], string>({
            query: () => `/current/trade-fiction-paperback.json?${import.meta.env.VITE_KEY}`,
            transformResponse: (response: ResponseBooksFiction) => {
                const books = response.results.books.map(dataFromDTO);

                return books;
            }
        }),
        getSearchResult: builder.query<DataSearch[], string>({
            query: (title = '') => `/best-sellers/history.json?${title && `${title}`}&${import.meta.env.VITE_KEY}`,
            transformResponse: (response: ResponseSearch) => response.results.map(dataSearchFromDTO)
        }),
        getSearchAutocomplete: builder.query<DataSearch[], string>({
            query: () => `/best-sellers/history.json?${import.meta.env.VITE_KEY}`,
            transformResponse: (response: ResponseSearch) => response.results.map(dataSearchFromDTO)
        }),
    })
});

export const { useGetBooksFictionQuery, useGetSearchResultQuery, useGetSearchAutocompleteQuery } = booksAPI;