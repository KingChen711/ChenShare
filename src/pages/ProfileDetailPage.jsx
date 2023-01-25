import { Box, Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Posts from '../components/Posts';
import { selectUser } from '../features/userSlice';
import { useGetPostsByUserQuery } from '../services/rtkQueryChenShareAPI';

const ProfileDetailPage = () => {
  const { avatarUrl, username } = useSelector(selectUser);
  const [selectedType, setSelectedType] = useState('created');
  const { data, isFetching } = useGetPostsByUserQuery({ type: selectedType });

  const changeType = () => {
    setSelectedType((prev) => (prev === 'created' ? 'saved' : 'created'));
  };

  return (
    <div>
      <div className="relative">
        <img
          alt="thumbnail"
          src="https://source.unsplash.com/1600x900/?nature,photography,technology"
          className="w-full h-36 md:h-80 lg:h-[500px] object-cover"
        />
        <img
          className="absolute z-50 w-20 h-20 rounded-full left-1/2 -translate-x-1/2 -translate-y-[40px]"
          alt="avatar"
          src={`${avatarUrl}`}
        />
      </div>
      <div className="text-center mt-14 mb-4 text-3xl font-bold">
        {username}
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
      {isFetching ? (
        <Box display="flex " justifyContent="center">
          <CircularProgress size="4rem" />
        </Box>
      ) : (
        <Posts posts={data?.posts} />
      )}
    </div>
  );
};

export default ProfileDetailPage;
