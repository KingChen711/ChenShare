import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthPage from './pages/AuthPage';
import CreatePostPage from './pages/CreatePostPage';
import HomePage from './pages/HomePage';
import PostDetailPage from './pages/PostDetailPage';
import ProfileDetailPage from './pages/ProfileDetailPage';
import PrivateRoute from './utils/PrivateRoute';

const App = () => (
  <BrowserRouter>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path="/profile/:id" element={<ProfileDetailPage />} />
        </Route>
      </Routes>
    </GoogleOAuthProvider>
  </BrowserRouter>
);

export default App;
