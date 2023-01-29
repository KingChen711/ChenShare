// import React, { useEffect, useState } from 'react';
// import { Box, CircularProgress, IconButton } from '@mui/material';
// import { Link } from 'react-router-dom';
// import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
// import { useSelector } from 'react-redux';
// import { URL_API } from '../utils/constants';
// import { selectUser } from '../features/userSlice';
// import { useSavePostMutation } from '../services/chenShareAPI';

// const PostItem = ({ data, isSaved }) => {
//   const { _id: postId, imageUrl, creator } = data;
//   const { id: userId } = useSelector(selectUser);
//   const [savePost] = useSavePostMutation();
//   const [isLoadingImage, setIsLoadingImage] = useState(true);
//   const [isPointer, setIsPointer] = useState(false);
//   const [statusSave, setStatusSave] = useState('Save');

//   useEffect(() => {
//     if (isSaved) setStatusSave('Saved');
//   }, [isSaved]);

//   const handleSavePost = async (e) => {
//     e.preventDefault();

//     if (statusSave === 'Saved') {
//       return;
//     }

//     setStatusSave('Saving');

//     await savePost({
//       userId,
//       postId,
//     });

//     setStatusSave('Saved');
//   };

//   // const downLoadImage = (e) => {
//   //   e.preventDefault();
//   //   console.log(imageUrl);
//   //   const imageName = imageUrl.split('\\')[1];
//   //   chenShareApi.get(`/file/download/${imageName}`);
//   // };

//   return (
//     <div className="flex flex-col">
//       <Link
//         onMouseEnter={() => setIsPointer(true)}
//         onMouseLeave={() => setIsPointer(false)}
//         className="w-full relative"
//         to={`/post/${postId}`}
//       >
//         {isLoadingImage && (
//           <Box display="flex " justifyContent="center">
//             <CircularProgress size="4rem" />
//           </Box>
//         )}
//         <img
//           style={{
//             display: isLoadingImage && 'hidden',
//           }}
//           className="w-full rounded-lg object-cover"
//           alt="post_image"
//           src={`${URL_API}/${imageUrl}`}
//           onLoad={() => setIsLoadingImage(false)}
//           onError={() => setIsLoadingImage(false)}
//         />
//         {!isLoadingImage && (
//           <div
//             onClick={(e) => e.preventDefault()}
//             style={{
//               visibility: isPointer && 'visible',
//             }}
//             className="absolute invisible top-2 z-50 left-2 rounded-full hover:opacity-100 bg-white flex justify-center items-center opacity-50"
//           >
//             <IconButton>
//               <DownloadForOfflineIcon />
//             </IconButton>
//           </div>
//         )}
//         {!isLoadingImage && (
//           <div
//             onClick={handleSavePost}
//             style={{
//               visibility: isPointer && 'visible',
//             }}
//             className="absolute invisible top-2 z-50 right-2 hover:opacity-100 opacity-50 bg-[#ef4444] py-2 px-4 rounded-3xl text-white font-bold"
//           >
//             {statusSave}
//           </div>
//         )}
//       </Link>
//       <Link className="flex items-center" to={`/profile/${creator?._id}`}>
//         <img
//           alt="avatar"
//           src={creator?.avatarUrl}
//           referrerPolicy="no-referrer"
//           className="w-8 h-8 my-2 rounded-full mr-3"
//         />
//         <div className="font-bold">{creator?.name}</div>
//       </Link>
//     </div>
//   );
// };

// export default PostItem;

import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { useSelector } from 'react-redux';
import { URL_API } from '../utils/constants';
import { selectUser } from '../features/userSlice';
import { useSavePostMutation } from '../services/chenShareAPI';

const PostItem = ({ data, isSaved }) => {
  const { _id: postId, imageUrl: imagePath, creator } = data;
  const { id: userId } = useSelector(selectUser);
  const [savePost] = useSavePostMutation();
  const [isPointer, setIsPointer] = useState(false);
  const [statusSave, setStatusSave] = useState('Save');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    setImageUrl(`${URL_API}/${imagePath}/300`);
  }, [imagePath]);

  useEffect(() => {
    if (isSaved) setStatusSave('Saved');
  }, [isSaved]);

  const handleSavePost = async (e) => {
    e.preventDefault();

    if (statusSave === 'Saved') {
      return;
    }

    setStatusSave('Saving');

    await savePost({
      userId,
      postId,
    });

    setStatusSave('Saved');
  };

  return (
    <div className="flex flex-col">
      <Link
        onMouseEnter={() => setIsPointer(true)}
        onMouseLeave={() => setIsPointer(false)}
        className="w-full relative"
        to={`/post/${postId}`}
      >
        <img
          className="w-full rounded-lg object-cover"
          alt="post_image"
          src={imageUrl}
        />
        <div
          onClick={(e) => e.preventDefault()}
          style={{
            visibility: isPointer && 'visible',
          }}
          className="absolute invisible top-2 z-50 left-2 rounded-full hover:opacity-100 bg-white flex justify-center items-center opacity-50"
        >
          <IconButton>
            <DownloadForOfflineIcon />
          </IconButton>
        </div>
        <div
          onClick={handleSavePost}
          style={{
            visibility: isPointer && 'visible',
          }}
          className="absolute invisible top-2 z-50 right-2 hover:opacity-100 opacity-50 bg-[#ef4444] py-2 px-4 rounded-3xl text-white font-bold"
        >
          {statusSave}
        </div>
      </Link>
      <Link className="flex items-center" to={`/profile/${creator?._id}`}>
        <img
          alt="avatar"
          src={creator?.avatarUrl}
          referrerPolicy="no-referrer"
          className="w-8 h-8 my-2 rounded-full mr-3"
        />
        <div className="font-bold">{creator?.name}</div>
      </Link>
    </div>
  );
};

export default PostItem;
