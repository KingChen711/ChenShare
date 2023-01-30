import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL_API } from '../utils/constants';

const baseUrl = `${URL_API}/api/`;

export const chenShareAPI = createApi({
  reducerPath: 'chenShareApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Posts'],
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
      providesTags: ['Posts'],
    }),
    getPostDetail: builder.query({
      query: ({ postId }) => ({
        url: `post/${postId}`,
      }),
      providesTags: ['Posts'],
    }),
    getUserDetail: builder.query({
      query: ({ userId }) => ({
        url: `user/${userId}`,
      }),
      providesTags: ['Posts'],
    }),
    postComment: builder.mutation({
      query: ({ message, userId, postId }) => ({
        url: 'comment',
        method: 'POST',
        body: {
          message,
          userId,
          postId,
        },
      }),
      invalidatesTags: ['Posts'],
    }),
    savePost: builder.mutation({
      query: (body) => ({
        url: 'user/save-post',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Posts'],
    }),
    createPost: builder.mutation({
      query: (body) => ({
        url: 'post/create-post',
        method: 'POST',
        body,
        headers: {
          authorization: `Bearer ${localStorage.getItem('chen-share-token')}`,
        },
      }),
      invalidatesTags: ['Posts'],
    }),
    uploadFile: builder.mutation({
      query: (body) => ({
        url: 'file/upload',
        method: 'POST',
        body,
      }),
    }),
    deleteFile: builder.mutation({
      query: (body) => ({
        url: 'file/delete',
        method: 'DELETE',
        body,
      }),
    }),
    loginUser: builder.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    getUserBasic: builder.query({
      query: () => ({
        url: '/auth/user',
        headers: {
          authorization: `Bearer ${localStorage.getItem('chen-share-token')}`,
        },
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetUserDetailQuery,
  useGetPostDetailQuery,
  usePostCommentMutation,
  useSavePostMutation,
  useCreatePostMutation,
  useUploadFileMutation,
  useDeleteFileMutation,
  useLoginUserMutation,
  useGetUserBasicQuery,
} = chenShareAPI;
