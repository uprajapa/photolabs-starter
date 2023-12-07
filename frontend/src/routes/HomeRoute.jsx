import React from 'react';

import { useState } from 'react';
import '../styles/HomeRoute.scss';
import TopNavigation from 'components/TopNavigationBar';
import PhotoList from 'components/PhotoList';

const HomeRoute = (props) => {
  const { photos, topics, favPhotos, setFavPhotos, onPhotoClicked, onLikeClicked, onCategorySelected } = props;
  const [favPhotosToDisplay, setFavPhotosToDisplay] = useState(false);
  
  // Toggle method to visit liked photos page and back to home page
  const toggleFavourite = () => {
    setFavPhotosToDisplay(!favPhotosToDisplay);
  };

  const filteredPhotos = favPhotosToDisplay ?
    [...photos].filter(photo => {
      return favPhotos.includes(photo.id);
    })
    :
    photos;

  return (
    <div className="home-route">
      <TopNavigation topics={topics} toggleFavourite={toggleFavourite} favPhotos={favPhotos} onCategorySelected={onCategorySelected} />
      <PhotoList
        photos={filteredPhotos}
        favPhotos={favPhotos}
        setFavPhotos={setFavPhotos}
        onPhotoClicked={onPhotoClicked}
        onLikeClicked={onLikeClicked}
      />
    </div>
  );
};

export default HomeRoute;
