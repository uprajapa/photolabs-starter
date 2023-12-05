import React, { useState } from 'react';

import '../styles/TopNavigationBar.scss'
import TopicList from './TopicList';
import FavIcon from './FavIcon';
import HomeRoute from 'routes/HomeRoute';
import PhotoList from './PhotoList';



const TopNavigation = (props) => {

  const { topics, toggleFavourite, favPhotos, setFavPhotos } = props;
  return (
    <div className="top-nav-bar">
      <span className="top-nav-bar__logo">PhotoLabs</span>
      <TopicList topics={topics} favPhotos={favPhotos} setFavPhotos={setFavPhotos} />
      <button onClick={toggleFavourite} className='favouriteButton'>
        { favPhotos && favPhotos.length > 0 ? <FavIcon selected="true" displayAlert="faef"/> : <FavIcon selected="true" />}
      </button>
    </div>
  );
};

export default TopNavigation;