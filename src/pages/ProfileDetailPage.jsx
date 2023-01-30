import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import Posts from '../components/Posts';
import { selectUser } from '../features/userSlice';
import { useGetUserDetailQuery } from '../services/chenShareAPI';

const ProfileDetailPage = () => {
  const { id: userIdParams } = useParams();
  const navigate = useNavigate();
  const { id: userIdStore } = useSelector(selectUser);
  const [selectedType, setSelectedType] = useState('created');
  const { data, isLoading, isError } = useGetUserDetailQuery({
    userId: userIdParams,
  });

  const logOut = () => {
    localStorage.clear();
    navigate('/auth');
  };

  if (isError) {
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

  return (
    <div>
      <div className="relative">
        <div
          style={{
            background:
              'linear-gradient(90deg, rgba(82,190,255,1) 0%, rgba(116,233,80,1) 100%)',
          }}
          className="w-full h-36 sm:h-56 md:h-80 lg:h-[500px]"
        />
        {userIdParams === userIdStore && (
          <div className="flex justify-center rounded-full bg-white items-center w-16 h-16 absolute top-4 right-4">
            <IconButton onClick={logOut}>
              <LogoutIcon style={{ color: '#ef4444', fontSize: '36px' }} />
            </IconButton>
          </div>
        )}
        <img
          className="absolute z-50 w-20 h-20 rounded-full left-1/2 -translate-x-1/2 -translate-y-[40px]"
          alt="avatar"
          referrerPolicy="no-referrer"
          src={`${data?.user?.avatarUrl}`}
        />
      </div>
      <div className="text-center mt-14 mb-4 text-3xl font-bold">
        {data?.user?.name}
      </div>
      <div className="flex justify-center">
        <Button
          onClick={() => setSelectedType('created')}
          variant={selectedType === 'created' ? 'contained' : 'outlined'}
          sx={{ marginRight: '16px', borderRadius: '20px' }}
        >
          Created
        </Button>
        <Button
          sx={{ borderRadius: '20px' }}
          onClick={() => setSelectedType('saved')}
          variant={selectedType === 'saved' ? 'contained' : 'outlined'}
        >
          Saved
        </Button>
      </div>
      <Posts posts={data?.user[`${selectedType}Posts`]} />
    </div>
  );
};

export default ProfileDetailPage;
