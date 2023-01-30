import React from 'react';
import { Link } from 'react-router-dom';

const Comment = ({ data }) => (
  <div className="flex mb-3">
    <Link className="shrink-0" to={`/profile/${data?.creator?._id}`}>
      <img
        className="w-9 h-9 rounded-full"
        alt="avatar"
        src={data?.creator?.avatarUrl}
        referrerPolicy="no-referrer"
      />
    </Link>
    <div className="flex flex-col ml-3">
      <div className="font-bold text-lg">{data?.creator.name}</div>
      <div>{data?.message}</div>
    </div>
  </div>
);

export default Comment;
