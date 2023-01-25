import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { URL_API } from '../utils/constants';

const PostItem = ({ data }) => {
  const { _id: id, imageUrl, creator } = data;
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const heightLoadingImage = Math.floor(Math.random() * (400 - 100 + 1) + 100);

  return (
    <div className="flex flex-col">
      <Link to={`/post/${id}`}>
        <div className="w-full">
          {isLoadingImage && (
            <div
              style={{
                height: `${heightLoadingImage}px`,
              }}
              className="w-full bg-gray-300 rounded-lg"
            />
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
        </div>
      </Link>
      <Link to={`/profile/${creator._id}`}>
        <div className="flex items-center">
          <img
            alt="avatar"
            src={creator.avatarUrl}
            className="w-8 h-8 my-2 rounded-full mr-3"
          />
          <div className="font-bold">{creator.name}</div>
        </div>
      </Link>
    </div>
  );
};

export default PostItem;
