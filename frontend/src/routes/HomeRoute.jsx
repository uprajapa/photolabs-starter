import React from 'react';

import { useState } from 'react';
import '../styles/HomeRoute.scss';
import TopNavigation from 'components/TopNavigationBar';
import PhotoList from 'components/PhotoList';

const HomeRoute = (props) => {
  const { photos, topics, favPhotos, setFavPhotos, setPhotoClicked, onLikeClicked} = props;
  const [favPhotosToDisplay, setFavPhotosToDisplay] = useState(false);
  
  const toggleFavourite = () => {
    setFavPhotosToDisplay(!favPhotosToDisplay);
  };

  const filteredPhotos = favPhotosToDisplay ?
    [...photos].filter(photo => {
      console.log(`Photo:`, photo);
      console.log(`Fav Photo inside filter: `, favPhotos);
      return favPhotos.includes(photo.id);
    })
    :
    photos;

  return (
    <div className="home-route">
      <TopNavigation topics={topics} toggleFavourite={toggleFavourite} favPhotos={favPhotos} />
      <PhotoList
        photos={filteredPhotos}
        favPhotos={favPhotos}
        setFavPhotos={setFavPhotos}
        setPhotoClicked={setPhotoClicked}
        onLikeClicked={onLikeClicked}
      />
    </div>
  );
};

export default HomeRoute;
