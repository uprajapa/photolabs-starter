import React from 'react';

import './App.scss';
import './styles/PhotoDetailsModal.scss';
import HomeRoute from 'routes/HomeRoute';
import PhotoList from 'components/PhotoList';
import FavIcon from 'components/FavIcon';
import useApplicationData from 'hooks/useApplicationData';


const App = () => {

  const {
    favPhotos, setFavPhotos, photoClicked, loading, onPhotoClicked, onLikeClicked, photos, topics, onCategorySelected
  } = useApplicationData();
  
  return (
    <div className="App">
      {loading &&
        <HomeRoute
          photos={photos}
          topics={topics}
          favPhotos={favPhotos}
          setFavPhotos={setFavPhotos}
          onPhotoClicked={onPhotoClicked}
          onLikeClicked={onLikeClicked}
          onCategorySelected={onCategorySelected}
        />
      }
      {loading ?? <h1>Page ias still Loading </h1>}
      {photoClicked && photoClicked.data &&
        <div className="photo-details-modal">
          <button className='photo-details-modal__close-button' onClick={() => onPhotoClicked({})}>X</button>
          <div className="photo-details-modal__div">

            <div className="photo-list__fav-icon" onClick={() => onLikeClicked(photoClicked.data.id)}>
              <div className="photo-list__fav-icon-svg">
                <FavIcon selected={favPhotos.includes(photoClicked.data.id)} />
              </div>
            </div>

            <img src={photoClicked.data.urls.regular} className="photo-details-modal__image" name="imageSource" />
            <div className="photo-details-modal__photographer-details">
              <img src={photoClicked.data.user.profile} className="photo-details-modal__photographer-profile" />
              <div className="photo-details-modal__photographer-text">
                <span className="photo-details-modal__photographer-info">{photoClicked.data.user.username}</span>
                <span className="photo-details-modal__photographer-location">{photoClicked.data.location.city}, {photoClicked.data.location.country}</span>
              </div>
            </div>
            <div className='photo-details-modal__header'>
              Similar Photos
            </div>
            <div className=''>
              <PhotoList photos={Object.values(photoClicked.data.similar_photos)} favPhotos={favPhotos} setFavPhotos={setFavPhotos} onPhotoClicked={onPhotoClicked} />
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default App;
