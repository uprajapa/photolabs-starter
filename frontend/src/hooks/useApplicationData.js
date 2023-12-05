import { useState, useReducer } from "react";

import photos from 'mocks/photos';
import topics from 'mocks/topics';

export default function useApplicationData() {

  const [favPhotos, setFavPhotos] = useState([]);
  
  const [photoClicked, setPhotoClicked] = useState({});
  // const [like, setLike] = useState(false);

  
  const onLikeClicked = (favPhotos, setFavPhotos, id) => {
    const newFavPhotos = [...favPhotos];
    if (newFavPhotos.includes(String(id))) {
      console.log(`Inside If!`);
      const trgtIndex = newFavPhotos.findIndex(x => x == String(id));
      console.log(`TargetIndex: ${trgtIndex} : `, newFavPhotos);
      newFavPhotos.splice(trgtIndex, 1);
      setFavPhotos(newFavPhotos);
    } else {
      setFavPhotos([...favPhotos, id]);
      console.log(`Inside ELSE!`);
    }
  };

  return {favPhotos, setFavPhotos, photoClicked, setPhotoClicked, onLikeClicked, photos, topics};
};
