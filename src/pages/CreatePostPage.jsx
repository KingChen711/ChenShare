/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { useSelector } from 'react-redux';
import { Box, Button, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../features/userSlice';
import { chenShareApi } from '../utils/chenShareAPI';
import { URL_API } from '../utils/constants';

const categories = [
  'cars',
  'fitness',
  'wallpaper',
  'websites',
  'photo',
  'food',
  'nature',
  'art',
  'travel',
  'quotes',
  'cats',
  'dogs',
];

const CreatePostPage = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [selectedImage, setSelectedImage] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [selectedImagePath, setSelectedImagePath] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    if (!selectedImage || wrongImageType) {
      return;
    }

    setIsPosting(true);

    const formData = new FormData();
    formData.append('imageUrl', selectedImagePath);
    formData.append('title', data.title);
    formData.append('message', data.message);
    formData.append('category', data.category);

    const {
      data: { post },
    } = await chenShareApi.post('post/create-post', formData);

    navigate(`/post/${post._id}`);
  };

  const uploadImage = async (e) => {
    const { type } = e.target.files[0];
    if (
      type === 'image/png'
      || type === 'image/jpg'
      || type === 'image/jpeg'
      || type === 'image/gif'
      || type === 'image/tiff'
      || type === 'image/svg'
    ) {
      setWrongImageType(false);
      setLoadingImage(true);
      setSelectedImage(e.target.files[0]);

      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      const {
        data: { imagePath },
      } = await chenShareApi.post('/file/upload-file', formData);

      setSelectedImagePath(imagePath);
      setLoadingImage(false);
    } else {
      setWrongImageType(true);
    }
  };

  const removeImage = () => {
    chenShareApi.post('/file/delete-file', { filePath: selectedImagePath });
    setSelectedImagePath('');
    setSelectedImage('');
  };

  if (isPosting) {
    return (
      <Box className="flex flex-col justify-center items-center">
        <div className="text-2xl font-bold">Please wait for posting...</div>
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-6 mx-6 mb-6 bg-white rounded-md lg:flex-row lg:max-w-6xl xl:mx-auto lg:mt-12 lg:justify-between"
    >
      {loadingImage && (
        <Box display="flex " justifyContent="center">
          <CircularProgress size="4rem" />
        </Box>
      )}

      {selectedImage ? (
        <div className="relative h-[200px] sm:h-[300px] md:h-[420px] flex justify-center items-center">
          <img
            alt="uploaded_image"
            src={`${URL_API}/${selectedImagePath}`}
            className="object-fit w-full h-full"
          />
          <button
            onClick={() => removeImage()}
            type="button"
            className="absolute bottom-3 right-3 p-3 rounded-full text-xl cursor-pointer outline-none bg-white"
          >
            <DeleteIcon />
          </button>
        </div>
      ) : (
        <label className="bg-[#f0f0f0] p-3 cursor-pointer rounded-sm">
          <div className="flex flex-col justify-around items-center h-[200px] sm:h-[300px] md:h-[420px] border-dotted border-gray-400 border-2 p-3">
            <div className="flex flex-col items-center">
              <CloudUploadOutlinedIcon />
              <div className="font-medium">Click to upload</div>
            </div>
            <input
              onChange={uploadImage}
              value={selectedImage}
              name="file"
              type="file"
              className="w-0 h-0"
            />
            <div className="text-xs md:text-base">
              Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or TIFF
              less than 20MB
            </div>
          </div>
          {wrongImageType && (
            <Box display="flex" mt={2} justifyContent="center">
              <p className="text-red-500 text-xl">Wrong image type</p>
            </Box>
          )}
        </label>
      )}
      <div className="flex flex-col mt-6 lg:w-96 lg:ml-6 lg:min-w-[396px]">
        <input
          className="p-2 text-3xl font-bold border-b border-b-gray-400 w-full"
          type="text"
          placeholder="Add your title"
          {...register('title', { required: true })}
        />
        {errors?.title && (
          <div className="text-red-500">Please add your title</div>
        )}
        <div className="flex items-center">
          <img
            alt="avatar"
            src={user.avatarUrl}
            referrerPolicy="no-referrer"
            className="w-12 h-12 rounded-full my-6"
          />
          <div className="ml-3 font-bold text-xl">{user.username}</div>
        </div>
        <input
          className="p-2 text-lg border-b border-b-gray-400 w-full"
          type="text"
          placeholder="Tell everyone what your Post about"
          {...register('message', { required: true })}
        />
        {errors?.message && (
          <div className="text-red-500">Please add your message</div>
        )}
        <select
          className="capitalize max-w-[300px] p-2 my-8 rounded-md outline-none bg-transparent shadow-lg"
          defaultValue=""
          {...register('category', { required: true })}
        >
          <option value="" disabled>
            Select category...
          </option>
          {categories.map((category) => (
            <option key={category} className="capitalize" value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors?.category && (
          <div className="text-red-500">Please select a category</div>
        )}
        <Button
          onClick={handleSubmit(onSubmit)}
          className="self-end"
          variant="contained"
          style={{
            width: 'fit-content',
            borderRadius: '20px',
          }}
        >
          Save Pin
        </Button>
      </div>
    </form>
  );
};

export default CreatePostPage;
