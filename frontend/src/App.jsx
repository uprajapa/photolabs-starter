import React from 'react';

import './App.scss';
import './styles/PhotoDetailsModal.scss';
import HomeRoute from 'routes/HomeRoute';
import useApplicationData from 'hooks/useApplicationData';
import { PhotoDetailsModal } from 'routes/PhotoDetailsModal';


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
      {photoClicked.id &&
        <PhotoDetailsModal
          photos={photos}
          favPhotos={favPhotos}
          setFavPhotos={setFavPhotos}
          onPhotoClicked={onPhotoClicked}
          onLikeClicked={onLikeClicked}
          photoClicked={photoClicked}
        />
      }
    </div>
  );
};

export default App;
