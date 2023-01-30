import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, CircularProgress, Typography } from '@mui/material';
import SideBar from '../components/SideBar';
import NavBar from '../components/NavBar';
import { setUser } from '../features/userSlice';
import { useGetUserBasicQuery } from '../services/chenShareAPI';

const PrivateRoute = () => {
  const token = localStorage.getItem('chen-share-token');
  const dispatch = useDispatch();
  const { data, isError, isLoading } = useGetUserBasicQuery();

  useEffect(() => {
    async function getUserData() {
      dispatch(
        setUser({
          id: data?.user?._id,
          email: data?.user?.email,
          username: data?.user?.name,
          avatarUrl: data?.user?.avatarUrl,
        }),
      );
    }
    getUserData();
  }, [data]);

  // execute when have token but error when get auth user
  if (token && isError) {
    return (
      <Box display="flex " justifyContent="center">
        <Typography variant="h2">Interval server error</Typography>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box display="flex " justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (token && token !== 'undefined') {
    return (
      <div className="flex">
        <SideBar />
        <div className="flex flex-col flex-1 h-screen overflow-y-auto pb-8">
          <NavBar />
          <Outlet />
        </div>
      </div>
    );
  }

  return <Navigate to="/auth" />;
};

export default PrivateRoute;
