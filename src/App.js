import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material';
import { SkeletonTheme } from 'react-loading-skeleton';
import AuthPage from './pages/AuthPage';
import CreatePostPage from './pages/CreatePostPage';
import HomePage from './pages/HomePage';
import PostDetailPage from './pages/PostDetailPage';
import ProfileDetailPage from './pages/ProfileDetailPage';
import PrivateRoute from './utils/PrivateRoute';
import NotFoundPage from './pages/NotFoundPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ef4444',
    },
  },
});

const App = () => (
  <SkeletonTheme baseColor="#aaa" highlightColor="#ddd">
    <BrowserRouter>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/create-post" element={<CreatePostPage />} />
              <Route path="/post/:id" element={<PostDetailPage />} />
              <Route path="/profile/:id" element={<ProfileDetailPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </SkeletonTheme>
);

export default App;
