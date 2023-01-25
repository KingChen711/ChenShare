import { Add } from '@mui/icons-material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
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
  const isMobile = useMediaQuery('(max-width:768px)');
  const [openSideBar, setOpenSideBar] = useState(false);
  return (
    <div>
      {!isMobile && (
        <div className="flex items-center p-6">
          <SearchBar />
          <Link to={`/profile/${user.id}`}>
            <img
              alt="avatar"
              src={user.avatarUrl}
              className="h-12 w-12 rounded-lg object-cover mr-2 ml-6"
            />
          </Link>
          <Link to="/create-post">
            <div className="h-12 w-12 rounded-lg flex justify-center items-center bg-[#ef4444] text-white">
              <Add />
            </div>
          </Link>
        </div>
      )}

      {isMobile && (
        <div className="flex flex-col">
          <AppBar
            position="sticky"
            style={{
              backgroundColor: 'white',
            }}
            className=" mb-4 shadow-lg"
          >
            <Toolbar className="flex justify-between items-center w-full">
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
                />
              </Link>
            </Toolbar>
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
          </AppBar>
          <div className="flex items-center p-6">
            <SearchBar />
            <Link className="ml-4" to="/create-post">
              <div className="h-12 w-12 rounded-lg flex justify-center items-center bg-[#ef4444] text-white">
                <Add />
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

const SearchBar = () => {
  const dispatch = useDispatch();
  const filterPost = useSelector(selectFilterPost);
  const [searchText, setSearchText] = useState(filterPost.searchQuery);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(setSearchQuery(searchText));
      }}
      className="flex-1 flex items-center bg-white rounded-lg"
    >
      <SearchIcon sx={{ marginLeft: '16px' }} />
      <input
        className="flex-1 py-3 px-4 bg-transparent w-0"
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
        placeholder="Search..."
      />
    </form>
  );
};

export default NavBar;
