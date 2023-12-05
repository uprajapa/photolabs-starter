import React from "react";

import "../styles/PhotoList.scss";
import PhotoListItem from "./PhotoListItem";


const PhotoList = (props) => {
  const { photos, favPhotos, setFavPhotos, onPhotoClicked, onLikeClicked} = props;
  
  return (
    <ul className="photo-list">
      <PhotoListItem
        photos={photos}
        setFavPhotos={setFavPhotos}
        favPhotos={favPhotos}
        onPhotoClicked={onPhotoClicked}
        onLikeClicked={onLikeClicked}
      />
    </ul>
  );
};

export default PhotoList;
