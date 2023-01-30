import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PostItemSkeleton = () => {
  const randomHeightSkeleton = Math.floor(
    Math.random() * (360 - 120 + 1) + 120,
  );
  return (
    <div className="flex flex-col">
      <Skeleton
        style={{ height: `${randomHeightSkeleton}px` }}
        className="w-full rounded-lg"
      />
      <div className="flex items-center">
        <Skeleton className="w-8 h-8 my-2 rounded-full mr-3" />
        <div className="flex-1">
          <Skeleton />
        </div>
      </div>
    </div>
  );
};

export default PostItemSkeleton;
