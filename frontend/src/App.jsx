import React from 'react';

import './App.scss';
import './styles/PhotoDetailsModal.scss';
import HomeRoute from 'routes/HomeRoute';
import PhotoFavButton from 'components/PhotoFavButton';
import PhotoList from 'components/PhotoList';
import FavIcon from 'components/FavIcon';
import useApplicationData from 'hooks/useApplicationData';

// const sampleDataForPhotoListItem = {
//   id: "1",
//   location: {
//     city: "Montreal",
//     country: "Canada",
//   },
//   imageSource: `${process.env.PUBLIC_URL}/Image-1-Regular.jpeg`,
//   username: "Joe Example",
//   profile: `${process.env.PUBLIC_URL}/profile-1.jpg`,
// };


const App = () => {
 
  const {
    favPhotos, setFavPhotos, photoClicked, setPhotoClicked, onLikeClicked, photos, topics
  } = useApplicationData();
  console.log(`App re-rendered!`);
  console.log(`FavPhotos: ${favPhotos}`);
  return (
    <div className="App">
      <HomeRoute
        photos={photos}
        topics={topics}
        favPhotos={favPhotos}
        setFavPhotos={setFavPhotos}
        setPhotoClicked={setPhotoClicked}
        onLikeClicked={onLikeClicked}
      />
      {photoClicked && photoClicked.data &&
        <div className="photo-details-modal">
          <button className='photo-details-modal__close-button' onClick={() => setPhotoClicked({})}>X</button>
          <div className="photo-details-modal__div">

            <div className="photo-list__fav-icon" onClick={() => onLikeClicked(favPhotos, setFavPhotos, photoClicked.data.id)}>
              <div className="photo-list__fav-icon-svg">
                { favPhotos.includes(photoClicked.data.id) ? <FavIcon selected={true} /> : <FavIcon selected={false} />}
                {/* <FavIcon selected={like} /> */}
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
              <PhotoList photos={Object.values(photoClicked.data.similar_photos)} favPhotos={favPhotos} setFavPhotos={setFavPhotos} setPhotoClicked={setPhotoClicked} />
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default App;
