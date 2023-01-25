import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL_API } from '../utils/constants';

const baseUrl = `${URL_API}/api/`;

const headers = {
  authorization: `Bearer ${localStorage.getItem('chen-share-token')}`,
};

export const rtkQueryChenShareAPI = createApi({
  reducerPath: 'chenShareApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  // prepareHeaders: (headers, { options }) => {
  //   options.headers = new Headers();
  //   const token = localStorage.getItem('chen-share-token');
  //   console.log(token);
  //   if (token) {
  //     options.headers.append('Authorization', `Bearer ${token}`);
  //   }
  //   return options;
  // },
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ category, searchQuery }) => {
        // search posts
        if (searchQuery && searchQuery !== '') {
          return 'post/get-searched-post';
        }

        // get posts by category
        if (category && category !== '' && category !== 'home') {
          return `post/category/${category}`;
        }

        // default get all posts
        return 'post/all';
      },
    }),
    getPostsByUser: builder.query({
      query: ({ type }) => ({
        url: `post/user/${type}`,
        headers,
      }),
    }),
  }),
});

export const { useGetPostsQuery, useGetPostsByUserQuery } = rtkQueryChenShareAPI;
