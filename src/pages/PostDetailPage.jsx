import { Box, Button, CircularProgress, IconButton, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { useSelector } from 'react-redux';
import {
  useGetPostDetailQuery,
  usePostCommentMutation,
} from '../services/chenShareAPI';
import { URL_API } from '../utils/constants';
import { selectUser } from '../features/userSlice';
import Posts from '../components/Posts';

const PostDetailPage = () => {
  const isMobile = useMediaQuery('(max-width:460px)');
  const user = useSelector(selectUser);
  const { id: postId } = useParams();
  const { data, isLoading } = useGetPostDetailQuery({ postId });
  const [postComment] = usePostCommentMutation();
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handlePostComment = async () => {
    if (!commentText) {
      return;
    }
    const message = commentText;
    setCommentText('');
    setIsPostingComment(true);
    await postComment({
      message,
      userId: user.id,
      postId,
    });
    setIsPostingComment(false);
  };

  if (isLoading) {
    return (
      <Box display="flex " justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  return (
    <div>
      <div className="flex flex-col xl:flex-row p-6">
        <div className="xl:basis-1/2 xl:mr-6 xl:my-auto">
          <img
            className="rounded-xl object-cover w-full"
            alt="post_image"
            src={`${URL_API}/${data?.post?.imageUrl}`}
          />
        </div>
        <div className="xl:basis-1/2">
          <IconButton>
            <DownloadForOfflineIcon
              sx={{ fontSize: '36px', marginBlock: '8px' }}
            />
          </IconButton>
          <div className="font-bold text-4xl">{data?.post?.title}</div>
          <div className="my-3">{data?.post?.message}</div>
          <Link
            to={`/profile/${data?.post?.creator?._id}`}
            className="flex items-center"
          >
            <img
              className="w-9 h-9 rounded-full"
              alt="avatar"
              src={data?.post?.creator?.avatarUrl}
              referrerPolicy="no-referrer"
            />
            <div className="font-bold text-xl ml-2">
              {data?.post?.creator?.name}
            </div>
          </Link>
          <div className="text-3xl my-4">Comments</div>
          <div className="max-h-96 overflow-y-auto">
            {data?.post?.comments?.map((comment) => (
              <div className="flex mb-3">
                <Link to={`/profile/${comment?.creator?._id}`}>
                  <img
                    className="w-9 h-9 rounded-full"
                    alt="avatar"
                    src={comment?.creator?.avatarUrl}
                    referrerPolicy="no-referrer"
                  />
                </Link>
                <div className="flex flex-col ml-3">
                  <div className="font-bold text-lg">
                    {comment?.creator.name}
                  </div>
                  <div>{comment?.message}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex my-4">
            <Link to={`/profile/${user?.id}`}>
              <img
                className="w-9 h-9 rounded-full"
                alt="avatar"
                src={user?.avatarUrl}
                referrerPolicy="no-referrer"
              />
            </Link>
            <form
              className="flex-1 mx-4"
              onSubmit={(e) => {
                e.preventDefault();
                handlePostComment();
              }}
            >
              <input
                className="w-full rounded-xl py-2 px-4 border-gray-300 border"
                placeholder="Add a comment"
                value={commentText}
                onChange={(e) => {
                  setCommentText(e.target.value);
                }}
                type="text"
              />
            </form>
            <Button
              onClick={() => {
                handlePostComment();
              }}
              style={{
                display: isMobile && 'none',
                borderRadius: '16px',
                paddingBlock: '8px',
                paddingInline: '16px',
              }}
              variant="contained"
            >
              {isPostingComment ? 'Doing' : 'Done'}
            </Button>
          </div>
          <Button
            onClick={() => {
              handlePostComment();
            }}
            style={{ display: !isMobile && 'none' }}
            sx={{
              borderRadius: '16px',
              paddingBlock: '8px',
              paddingInline: '16px',
              float: 'right',
              marginRight: '18px',
            }}
            variant="contained"
          >
            {isPostingComment ? 'Doing' : 'Done'}
          </Button>
        </div>
      </div>
      <div className="text-center text-4xl font-bold my-6">More like this</div>
      <Posts posts={data?.samePosts?.filter((post) => post._id !== postId)} />
    </div>
  );
};

export default PostDetailPage;
