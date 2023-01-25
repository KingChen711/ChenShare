import React from 'react';
import Masonry from 'react-masonry-css';
import PostItem from './PostItem';

const Posts = ({ posts }) => {
  const breakpointColumnsObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
  };
  return (
    <div className="p-6">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-3"
        columnClassName="my-masonry-grid_column"
      >
        {posts.map((post) => (
          <PostItem key={post._id} data={post} />
        ))}
      </Masonry>
    </div>
  );
};

export default Posts;
