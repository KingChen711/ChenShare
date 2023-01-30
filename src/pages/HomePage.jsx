import { Box, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Posts from '../components/Posts';
import PostsSkeleton from '../components/PostsSkeleton';
import { selectFilterPost } from '../features/filterPostSlice';
import { useGetPostsQuery } from '../services/chenShareAPI';

const HomePage = () => {
  const { category, searchQuery } = useSelector(selectFilterPost);
  const { data, isLoading, isError } = useGetPostsQuery({
    category,
    searchQuery,
  });

  if (isError) {
    return (
      <Box display="flex " justifyContent="center">
        <Typography variant="h2">Interval server error</Typography>
      </Box>
    );
  }

  if (isLoading) {
    return <PostsSkeleton />;
  }

  return <Posts posts={data?.posts} />;
};

export default HomePage;
