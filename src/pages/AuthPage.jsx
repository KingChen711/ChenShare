import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
// eslint-disable-next-line import/no-extraneous-dependencies, camelcase
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import videoBg from '../assets/share.mp4';
import { setUser } from '../features/userSlice';
import logo from '../assets/logowhite.png';
import { chenShareApi } from '../utils/chenShareAPI';

const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function loginUser(googleToken) {
    const userData = jwt_decode(googleToken);

    const { data: { user, accessToken } } = await chenShareApi.post('/auth/login', {
      email: userData.email,
      name: userData.name,
      avatarUrl: userData.picture,
    });

    dispatch(
      setUser({
        id: user._id,
        email: user.email,
        username: user.name,
        avatarUrl: user.avatarUrl,
      }),
    );

    localStorage.setItem('chen-share-token', accessToken);

    navigate('/');
  }

  return (
    <div className="h-screen w-screen relative">
      <div className="absolute top-0 left-0 w-full h-full z-10 bg-black opacity-80" />
      <video
        className="w-full h-full object-cover"
        src={videoBg}
        autoPlay
        loop
        muted
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col justify-center items-center">
        <img alt="logo" src={logo} className="h-8 object-cover mb-4" />
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const googleToken = credentialResponse.credential;
            loginUser(googleToken);
          }}
          onError={() => {}}
        />
      </div>
    </div>
  );
};

export default AuthPage;
