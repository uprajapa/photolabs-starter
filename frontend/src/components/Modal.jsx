import React from 'react';

import '../styles/PhotoDetailsModal.scss';
import FavIcon from './FavIcon';
import PhotoList from './PhotoList';

export const Modal = (props) => {
  const { favPhotos, setFavPhotos, onPhotoClicked, onLikeClicked, photoClicked } = props;
  return (
    <div className="photo-details-modal">
      <button className='photo-details-modal__close-button' onClick={() => onPhotoClicked({})}>X</button>
      <div className="photo-details-modal__div">

        <div className="photo-list__fav-icon" onClick={() => onLikeClicked(photoClicked.id)}>
          <div className="photo-list__fav-icon-svg">
            <FavIcon selected={favPhotos.includes(photoClicked.id)} />
          </div>
        </div>

        <img src={photoClicked.urls.regular} className="photo-details-modal__image" name="imageSource" />
        <div className="photo-details-modal__photographer-details">
          <img src={photoClicked.user.profile} className="photo-details-modal__photographer-profile" />
          <div className="photo-details-modal__photographer-text">
            <span className="photo-details-modal__photographer-info">{photoClicked.user.username}</span>
            <span className="photo-details-modal__photographer-location">{photoClicked.location.city}, {photoClicked.location.country}</span>
          </div>
        </div>
        <div className='photo-details-modal__header'>
          Similar Photos
        </div>
        <div className='photo-list'>
          <PhotoList photos={Object.values(photoClicked.similar_photos)}
            favPhotos={favPhotos}
            setFavPhotos={setFavPhotos}
            onPhotoClicked={onPhotoClicked}
            onLikeClicked={onLikeClicked}
          />
        </div>
      </div>
    </div>
  )
}