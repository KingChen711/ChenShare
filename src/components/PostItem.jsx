// import { Box, CircularProgress, IconButton } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
// import { useSelector } from 'react-redux';
// import { URL_API } from '../utils/constants';
// import { chenShareApi } from '../utils/chenShareAPI';
// import { selectUser } from '../features/userSlice';

// const PostItem = ({ data, isSaved }) => {
//   const { _id: id, imageUrl, creator } = data;
//   const { id: userId } = useSelector(selectUser);
//   const [isLoadingImage, setIsLoadingImage] = useState(true);
//   const [isPointer, setIsPointer] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [statusSave, setStatusSave] = useState('Save');

//   useEffect(() => {
//     if (isSaving) {
//       setStatusSave('Saving');
//       return;
//     }
//     if (isSaved) {
//       setStatusSave('Saved');
//       return;
//     }
//     setStatusSave('Save');
//   }, [isSaved, isSaving]);

//   const savePost = async (e) => {
//     e.preventDefault();
//     if (statusSave === 'Saved') {
//       return;
//     }

//     setIsSaving(true);
//     await chenShareApi.post('user/save-post', {
//       userId,
//       postId: id,
//     });
//     setStatusSave('Saved');
//   };

//   return (
//     <div className="flex flex-col">
//       <Link to={`/post/${id}`}>
//         <div
//           onMouseEnter={() => setIsPointer(true)}
//           onMouseLeave={() => setIsPointer(false)}
//           className="w-full relative"
//         >
//           {isLoadingImage && (
//             <Box display="flex " justifyContent="center">
//               <CircularProgress size="4rem" />
//             </Box>
//           )}
//           <img
//             style={{
//               display: isLoadingImage && 'hidden',
//             }}
//             className="w-full rounded-lg object-cover"
//             alt="post_image"
//             src={`${URL_API}/${imageUrl}`}
//             onLoad={() => setIsLoadingImage(false)}
//             onError={() => setIsLoadingImage(false)}
//           />
//           {!isLoadingImage && (
//             <div
//               onClick={(e) => e.stopPropagation()}
//               // href={`${URL_API}/${imageUrl}`}
//               // download
//               style={{
//                 visibility: isPointer && 'visible',
//               }}
//               className="absolute invisible top-2 z-50 left-2 rounded-full hover:opacity-100 bg-white flex justify-center items-center opacity-50"
//             >
//               <IconButton>
//                 <DownloadForOfflineIcon />
//               </IconButton>
//             </div>
//           )}
//           {!isLoadingImage && (
//             <div
//               onClick={savePost}
//               style={{
//                 visibility: isPointer && 'visible',
//               }}
//               className="absolute invisible top-2 z-50 right-2 hover:opacity-100 opacity-50 bg-[#ef4444] py-2 px-4 rounded-3xl text-white font-bold"
//             >
//               {statusSave}
//             </div>
//           )}
//         </div>
//       </Link>
//       <Link to={`/profile/${creator?._id}`}>
//         <div className="flex items-center">
//           <img
//             alt="avatar"
//             src={creator?.avatarUrl}
//             referrerPolicy="no-referrer"
//             className="w-8 h-8 my-2 rounded-full mr-3"
//           />
//           <div className="font-bold">{creator?.name}</div>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default PostItem;

import { Box, CircularProgress, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { useSelector } from 'react-redux';
import { URL_API } from '../utils/constants';
import { chenShareApi } from '../utils/chenShareAPI';
import { selectUser } from '../features/userSlice';

const PostItem = ({ data, isSaved }) => {
  const { _id: id, imageUrl, creator } = data;
  const { id: userId } = useSelector(selectUser);
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [isPointer, setIsPointer] = useState(false);

  const [statusSave, setStatusSave] = useState('Save');

  useEffect(() => {
    if (isSaved) setStatusSave('Saved');
  }, [isSaved]);

  const savePost = async (e) => {
    e.preventDefault();
    if (statusSave === 'Saved') {
      return;
    }

    setStatusSave('Saving');

    await chenShareApi.post('user/save-post', {
      userId,
      postId: id,
    });

    setStatusSave('Saved');
  };

  return (
    <div className="flex flex-col">
      <Link to={`/post/${id}`}>
        <div
          onMouseEnter={() => setIsPointer(true)}
          onMouseLeave={() => setIsPointer(false)}
          className="w-full relative"
        >
          {isLoadingImage && (
            <Box display="flex " justifyContent="center">
              <CircularProgress size="4rem" />
            </Box>
          )}
          <img
            style={{
              display: isLoadingImage && 'hidden',
            }}
            className="w-full rounded-lg object-cover"
            alt="post_image"
            src={`${URL_API}/${imageUrl}`}
            onLoad={() => setIsLoadingImage(false)}
            onError={() => setIsLoadingImage(false)}
          />
          {!isLoadingImage && (
            <div
              onClick={(e) => e.stopPropagation()}
              // href={`${URL_API}/${imageUrl}`}
              // download
              style={{
                visibility: isPointer && 'visible',
              }}
              className="absolute invisible top-2 z-50 left-2 rounded-full hover:opacity-100 bg-white flex justify-center items-center opacity-50"
            >
              <IconButton>
                <DownloadForOfflineIcon />
              </IconButton>
            </div>
          )}
          {!isLoadingImage && (
            <div
              onClick={savePost}
              style={{
                visibility: isPointer && 'visible',
              }}
              className="absolute invisible top-2 z-50 right-2 hover:opacity-100 opacity-50 bg-[#ef4444] py-2 px-4 rounded-3xl text-white font-bold"
            >
              {statusSave}
            </div>
          )}
        </div>
      </Link>
      <Link to={`/profile/${creator?._id}`}>
        <div className="flex items-center">
          <img
            alt="avatar"
            src={creator?.avatarUrl}
            referrerPolicy="no-referrer"
            className="w-8 h-8 my-2 rounded-full mr-3"
          />
          <div className="font-bold">{creator?.name}</div>
        </div>
      </Link>
    </div>
  );
};

export default PostItem;
