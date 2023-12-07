import React, { useState } from 'react';

import '../styles/TopNavigationBar.scss'
import TopicList from './TopicList';
import FavIcon from './FavIcon';


const TopNavigation = (props) => {
  const { topics, toggleFavourite, favPhotos, setFavPhotos, onCategorySelected, searchInput, dispatch } = props;

  const handleChange = (e) => {
    console.log(searchInput);
    e.preventDefault();
    dispatch({ type: 'SEARCH_PHOTOS', payload: e.target.value})
  };

  return (
    <div className="top-nav-bar">
      <span className="top-nav-bar__logo">PhotoLabs</span>
      <TopicList topics={topics} favPhotos={favPhotos} setFavPhotos={setFavPhotos} onCategorySelected={onCategorySelected} />
      <div className="search-bar">
        <form action="" ></form>
        <input type="text" placeholder='Search by Username' name="search" value={searchInput} onChange={(e) => dispatch({ type: 'SEARCH_PHOTOS', payload: e.target.value})}></input>
        {/* <button onClick={() => handleChange()}></button> */}
      </div>
      <button onClick={toggleFavourite} className='favouriteButton'>
        {favPhotos && favPhotos.length > 0 ? <FavIcon selected="true" displayAlert="faef" /> : <FavIcon selected="true" />}
      </button>
    </div>
  );
};

export default TopNavigation;