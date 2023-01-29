import { Box, CircularProgress } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Posts from '../components/Posts';
import { selectFilterPost } from '../features/filterPostSlice';
import { useGetPostsQuery } from '../services/chenShareAPI';

const HomePage = () => {
  const { category, searchQuery } = useSelector(selectFilterPost);
  const { data, isLoading } = useGetPostsQuery({ category, searchQuery });

  if (isLoading) {
    return (
      <Box display="flex " justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  return <Posts posts={data?.posts} />;
};

export default HomePage;
