import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies, camelcase
import { useDispatch } from 'react-redux';
import SideBar from '../components/SideBar';
import NavBar from '../components/NavBar';
import { chenShareApi } from './chenShareAPI';
import { setUser } from '../features/userSlice';

const PrivateRoute = () => {
  const token = localStorage.getItem('chen-share-token');
  const dispatch = useDispatch();

  useEffect(() => {
    async function getUserData() {
      const {
        data: { user },
      } = await chenShareApi.post('/auth/get-user');
      dispatch(
        setUser({
          id: user._id,
          email: user.email,
          username: user.name,
          avatarUrl: user.avatarUrl,
        }),
      );
    }
    getUserData();
  }, [token]);

  if (token && token !== 'undefined') {
    return (
      <div className="flex">
        <SideBar />
        <div className="flex flex-col flex-1 h-screen overflow-y-auto">
          <NavBar />
          <Outlet />
        </div>
      </div>
    );
  }

  return <Navigate to="/auth" />;
};

export default PrivateRoute;
