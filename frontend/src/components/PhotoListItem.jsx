import React from "react";

import "../styles/PhotoListItem.scss";
import PhotoFavButton from "./PhotoFavButton";

const PhotoListItem = (props) => {
  const { photo, favPhotos, setFavPhotos, onPhotoClicked, onLikeClicked } = props;

  // let output = photos.map(data => {
  //   return (
  //     <li key={data.id}>
  //       <div className="photo-list__item" >
  //         <PhotoFavButton
  //           key={data.id}
  //           favPhotos={favPhotos}
  //           setFavPhotos={setFavPhotos}
  //           photoId={data.id}
  //           onLikeClicked={onLikeClicked}

  //         />
  //         <img src={data.urls.regular} className="photo-list__image" onClick={() => onPhotoClicked({data})} name="imageSource" />
  //         <div className="photo-list__user-details">
  //           <img src={data.user.profile} className="photo-list__user-profile" />
  //           <div className="photo-list__user-text">
  //             <span className="photo-list__user-info">{data.user.username}</span>
  //             <span className="photo-list__user-location">{data.location.city}, {data.location.country}</span>
  //           </div>
  //         </div>
  //       </div>
  //     </li>
  //   );
  // });

  return (
    <li key={photo.id}>
      <div className="photo-list__item" >
        <PhotoFavButton
          key={photo.id}
          favPhotos={favPhotos}
          setFavPhotos={setFavPhotos}
          photoId={photo.id}
          onLikeClicked={onLikeClicked}
        />
        <img src={photo.urls.regular} className="photo-list__image" onClick={() => onPhotoClicked(photo)} name="imageSource" />
        <div className="photo-list__user-details">
          <img src={photo.user.profile} className="photo-list__user-profile" />
          <div className="photo-list__user-text">
            <span className="photo-list__user-info">{photo.user.username}</span>
            <span className="photo-list__user-location">{photo.location.city}, {photo.location.country}</span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default PhotoListItem;
