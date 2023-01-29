import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center mt-24">
      <div className="w-48 h-48 rounded-full flex justify-center items-center border-8 border-[#CAC3C8] text-[#CAC3C8] text-7xl font-bold">
        404
      </div>
      <div className="text-[#CAC3C8] my-6 text-3xl font-bold">Oops!</div>
      <div className="text-[#CAC3C8] my-6 text-2xl text-center px-4">
        The page you are looking for could not be found.
      </div>
      <div onClick={() => navigate('/')} className="text-[#ef4444] font-bold my-6 text-3xl hover:underline cursor-pointer">
        Go back?
      </div>
    </div>
  );
};

export default NotFoundPage;
