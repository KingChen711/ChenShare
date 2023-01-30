import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import {
  selectFilterPost,
  setCategory,
  setSearchQuery,
} from '../features/filterPostSlice';
import { categories } from '../utils/constants';

const SideBar = ({ isMobile }) => {
  const dispatch = useDispatch();
  const { category: selectedCategory } = useSelector(selectFilterPost);

  const handleChooseCategory = (category) => {
    dispatch(setCategory(category));
    dispatch(setSearchQuery(''));
  };

  return (
    <div
      style={{
        display: isMobile && 'block',
      }}
      className="w-60 h-screen overflow-y-auto hidden md:block"
    >
      <Link to="/" onClick={() => handleChooseCategory('home')}>
        <img className="h-8 object-cover mt-6 px-4" alt="logo" src={logo} />
      </Link>
      <Link to="/" onClick={() => handleChooseCategory('home')}>
        <div
          style={{
            borderLeft: selectedCategory === 'home' && '3px solid black',
            color: selectedCategory === 'home' && 'black',
            fontWeight: selectedCategory === 'home' ? '700' : '500',
          }}
          className="flex items-center my-1 py-3 px-4 mt-6 text-gray-500 hover:opacity-50 cursor-pointer"
        >
          <HomeIcon />
          <div className="ml-2">Home</div>
        </div>
      </Link>
      <List sx={{ color: 'black' }}>
        <ListSubheader sx={{ fontSize: '20px' }}>
          Discover categories
        </ListSubheader>
        {categories.map((category) => {
          const { value, icon } = category;
          return (
            <Link to="/" key={value}>
              <ListItem
                style={{
                  borderLeft: selectedCategory === value && '3px solid black',
                }}
                onClick={() => handleChooseCategory(value)}
                button
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={(
                    <Typography
                      type="body2"
                      style={{
                        color: selectedCategory === value && 'black',
                        fontWeight: selectedCategory === value ? '700' : '500',
                      }}
                      className="text-gray-500 capitalize"
                    >
                      {value}
                    </Typography>
                  )}
                />
              </ListItem>
            </Link>
          );
        })}
      </List>
    </div>
  );
};

export default SideBar;
