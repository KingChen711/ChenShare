import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
// eslint-disable-next-line import/no-extraneous-dependencies, camelcase
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import videoBg from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { useLoginUserMutation } from '../services/chenShareAPI';

const AuthPage = () => {
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();

  async function handleLoginUser(googleToken) {
    const userData = jwt_decode(googleToken);

    await loginUser({
      email: userData.email,
      name: userData.name,
      avatarUrl: userData.picture,
    })
      .then((res) => {
        localStorage.setItem('chen-share-token', res.data.accessToken);
      })
      .then(() => {
        navigate('/');
      });
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
            handleLoginUser(googleToken);
          }}
          onError={() => {}}
        />
      </div>
    </div>
  );
};

export default AuthPage;
