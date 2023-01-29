import { Box, Button, CircularProgress, IconButton } from '@mui/material';
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
  const { data, isLoading } = useGetUserDetailQuery({
    userId: userIdParams,
  });

  const changeType = () => {
    setSelectedType((prev) => (prev === 'created' ? 'saved' : 'created'));
  };

  const logOut = () => {
    localStorage.clear();
    navigate('/auth');
  };

  return (
    <div>
      <div className="relative">
        <img
          alt="thumbnail"
          src="https://source.unsplash.com/1600x900/?nature,photography,technology"
          className="w-full h-36 md:h-80 lg:h-[500px] object-cover"
        />
        {userIdParams === userIdStore && (
          <div className="flex justify-center rounded-full bg-white items-center w-12 h-12 absolute top-4 right-4">
            <IconButton onClick={logOut}>
              <LogoutIcon style={{ color: '#ef4444' }} />
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
          onClick={() => changeType()}
          variant={selectedType === 'created' ? 'contained' : 'outlined'}
          sx={{ marginRight: '16px', borderRadius: '20px' }}
        >
          Created
        </Button>
        <Button
          sx={{ borderRadius: '20px' }}
          onClick={() => changeType()}
          variant={selectedType === 'saved' ? 'contained' : 'outlined'}
        >
          Saved
        </Button>
      </div>
      {isLoading ? (
        <Box display="flex " justifyContent="center">
          <CircularProgress size="4rem" />
        </Box>
      ) : (
        <Posts posts={data?.user[`${selectedType}Posts`]} />
      )}
    </div>
  );
};

export default ProfileDetailPage;
