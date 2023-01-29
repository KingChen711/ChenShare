import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SideBar from '../components/SideBar';
import NavBar from '../components/NavBar';
import { setUser } from '../features/userSlice';
import { useGetUserBasicQuery } from '../services/chenShareAPI';

const PrivateRoute = () => {
  const token = localStorage.getItem('chen-share-token');
  const dispatch = useDispatch();
  const { data } = useGetUserBasicQuery();

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
