import { Add } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { AppBar, Drawer, IconButton, Toolbar } from '@mui/material';
import {
  selectFilterPost,
  setCategory,
  setSearchQuery,
} from '../features/filterPostSlice';
import { selectUser } from '../features/userSlice';
import logo from '../assets/logo.png';
import SideBar from './SideBar';

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isMobile = useMediaQuery('(max-width:767px)');
  const [openSideBar, setOpenSideBar] = useState(false);
  return (
    <AppBar position="sticky" style={{ backgroundColor: '#f1f5f9' }}>
      {!isMobile && (
        <Toolbar className="flex items-center px-6 py-4">
          <SearchBar />
          <Link to={`/profile/${user.id}`}>
            {user.avatarUrl ? (
              <img
                alt="avatar"
                referrerPolicy="no-referrer"
                src={user.avatarUrl}
                className="h-12 w-12 rounded-lg object-cover mr-2 ml-6"
              />
            ) : (
              <Skeleton className="w-12 h-12 rounded-lg mr-2 ml-6" />
            )}
          </Link>
          <Link to="/create-post">
            <div className="h-12 w-12 rounded-lg flex justify-center items-center bg-[#ef4444] text-white">
              <Add />
            </div>
          </Link>
        </Toolbar>
      )}

      {isMobile && (
        <Toolbar style={{ padding: 0 }} className="flex flex-col">
          <div className="w-full">
            <div className="flex justify-between items-center w-full px-6">
              <IconButton onClick={() => setOpenSideBar(true)}>
                <MenuIcon sx={{ fontSize: '40px' }} />
              </IconButton>
              <Link to="/" onClick={() => dispatch(setCategory('home'))}>
                <img className="w-28 object-cover" alt="logo" src={logo} />
              </Link>
              <Link to={`/profile/${user.id}`}>
                <img
                  className="w-9 h-9 rounded-full"
                  alt="logo"
                  src={user.avatarUrl}
                  referrerPolicy="no-referrer"
                />
              </Link>
            </div>
            <Drawer
              variant="temporary"
              anchor="right"
              open={openSideBar}
              onClose={() => setOpenSideBar(false)}
              sx={{
                display: 'flex',
                justifyContent: 'end',
                overflow: 'scroll',
                height: 'auto',
              }}
            >
              <div onClick={() => setOpenSideBar(false)}>
                <SideBar isMobile />
              </div>
            </Drawer>
          </div>
          <div className="flex items-center px-6 py-3 w-full">
            <SearchBar />
            <Link className="ml-4" to="/create-post">
              <div className="h-12 w-12 rounded-lg flex justify-center items-center bg-[#ef4444] text-white">
                <Add />
              </div>
            </Link>
          </div>
        </Toolbar>
      )}
    </AppBar>
  );
};

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filterPost = useSelector(selectFilterPost);
  const [searchText, setSearchText] = useState(filterPost.searchQuery);

  useEffect(() => {
    setSearchText(filterPost.searchQuery);
  }, [filterPost]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (searchText === '') return;
        dispatch(setSearchQuery(searchText));
        dispatch(setCategory(''));
        navigate('/');
      }}
      className="flex-1 flex items-center border-b border-b-gray-500"
    >
      <SearchIcon sx={{ color: 'black', marginLeft: '16px' }} />
      <input
        className="flex-1 py-3 px-4 bg-transparent w-0 text-black"
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
        placeholder="Search..."
      />
    </form>
  );
};

export default NavBar;
