import React from 'react';

import FavIcon from './FavIcon';
import '../styles/PhotoFavButton.scss';

function PhotoFavButton(props) {
  const { photoId, favPhotos, setFavPhotos, onLikeClicked} = props;
  
  return (
    <div className="photo-list__fav-icon" onClick={() => onLikeClicked(photoId)}>
      <div className="photo-list__fav-icon-svg">
        <FavIcon selected={favPhotos.includes(photoId)} />
      </div>
    </div>
  );
}

export default PhotoFavButton;