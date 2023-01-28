import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL_API } from '../utils/constants';

const baseUrl = `${URL_API}/api/`;

// const headers = {
//   authorization: `Bearer ${localStorage.getItem('chen-share-token')}`,
// };

export const chenShareAPI = createApi({
  reducerPath: 'chenShareApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ category, searchQuery }) => {
        // search posts
        if (searchQuery && searchQuery !== '') {
          return `post/search/${searchQuery}`;
        }

        // get posts by category
        if (category && category !== '' && category !== 'home') {
          return `post/category/${category}`;
        }

        // default get all posts
        return 'post/all';
      },
    }),
    getPostDetail: builder.query({
      query: ({ postId }) => ({
        url: `post/${postId}`,
      }),
    }),
    getUserDetail: builder.query({
      query: ({ userId }) => ({
        url: `user/${userId}`,
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetUserDetailQuery,
  useGetPostDetailQuery,
} = chenShareAPI;
