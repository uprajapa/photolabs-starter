import React from "react";

import "../styles/PhotoListItem.scss";
import PhotoFavButton from "./PhotoFavButton";

const PhotoListItem = (props) => {
  const { photos, favPhotos, setFavPhotos, onPhotoClicked, onLikeClicked} = props;

  let output = photos.map(data => {
    return (
      <li key={data.id}>
        <div className="photo-list__item" >
          <PhotoFavButton
            key={data.id}
            favPhotos={favPhotos}
            setFavPhotos={setFavPhotos}
            photoId={data.id}
            onLikeClicked={onLikeClicked}

          />
          <img src={data.urls.regular} className="photo-list__image" onClick={() => onPhotoClicked({data})} name="imageSource" />
          <div className="photo-list__user-details">
            <img src={data.user.profile} className="photo-list__user-profile" />
            <div className="photo-list__user-text">
              <span className="photo-list__user-info">{data.user.username}</span>
              <span className="photo-list__user-location">{data.location.city}, {data.location.country}</span>
            </div>
          </div>
        </div>
      </li>
    );
  });

  return (
    <>
      {output}
    </>
  );
};

export default PhotoListItem;
