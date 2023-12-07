import React from "react";

import "../styles/PhotoList.scss";
import PhotoListItem from "./PhotoListItem";


const PhotoList = (props) => {
  const { photos, favPhotos, setFavPhotos, onPhotoClicked, onLikeClicked } = props;
  
  const photo = photos.map(data => {
    return (
      <PhotoListItem
        key={data.id}
        photo={data}
        setFavPhotos={setFavPhotos}
        favPhotos={favPhotos}
        onPhotoClicked={onPhotoClicked}
        onLikeClicked={onLikeClicked}
      />
    );
  });

  return (
    <ul className="photo-list">
      {photo}
    </ul>
  );
};

export default PhotoList;
