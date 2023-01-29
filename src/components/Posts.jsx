import React from 'react';
import Masonry from 'react-masonry-css';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import PostItem from './PostItem';

const Posts = ({ posts }) => {
  const { id: userId } = useSelector(selectUser);
  const breakpointColumnsObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
  };

  if (!posts || posts.length === 0) {
    return (
      <div className="text-4xl font-bold text-black px-6">
        Sorry, not found any post.
      </div>
    );
  }

  return (
    <div className="p-6">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-3"
        columnClassName="my-masonry-grid_column"
      >
        {posts?.map((post) => {
          const isSaved = post?.savingUsers?.find((user) => user === userId);
          return <PostItem isSaved={isSaved} key={post._id} data={post} />;
        })}
      </Masonry>
    </div>
  );
};

export default Posts;
