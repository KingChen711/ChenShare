import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL_API } from '../utils/constants';

const baseUrl = `${URL_API}/api/`;

export const rtkQueryChenShareAPI = createApi({
  reducerPath: 'chenShareApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  // eslint-disable-next-line no-unused-vars
  prepareHeaders: (headers, { getState }) => {
    headers.set(
      'Authorization',
      `Bearer ${localStorage.getItem('chen-share-token')}`,
    );
    return headers;
  },
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ category, searchQuery }) => {
        // search posts
        if (searchQuery && searchQuery !== '') {
          return 'post/get-searched-post';
        }

        // get posts by category
        if (category && category !== '' && category !== 'home') {
          return `post/get-posts-by-category/${category}`;
        }

        // default get all posts
        return 'post/get-posts';
      },
    }),
  }),
});

export const { useGetPostsQuery } = rtkQueryChenShareAPI;
