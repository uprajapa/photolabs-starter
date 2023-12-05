import React, { useState } from 'react';

import FavIcon from './FavIcon';
import '../styles/PhotoFavButton.scss';

// const onLikeClicked = (favPhotos, setFavPhotos, like, setLike, id) => {
//   const newFavPhotos = [...favPhotos];
//   if (newFavPhotos.includes(String(id))) {
//     console.log(`Inside If!`);
//     const trgtIndex = newFavPhotos.findIndex(x => x == String(id));
//     console.log(`TargetIndex: ${trgtIndex} : `, newFavPhotos);
//     newFavPhotos.splice(trgtIndex, 1);
//     setFavPhotos(newFavPhotos);
//   } else {
//     setFavPhotos([...favPhotos, id]);
//     console.log(`Inside ELSE!`);
//   }
//   // newFavPhotos.includes(String(id)) ? setFavPhotos(newFavPhotos.splice(newFavPhotos.findIndex(x => x == String(id)), 1)) : setFavPhotos([...favPhotos, id]);
//   // console.log(`Line 9:`, newFavPhotos.findIndex(x => x === id), newFavPhotos.includes(id), typeof id);
//   // console.log(`Line 9:`, newFavPhotos);
//   // setFavPhotos([...favPhotos, id]);
//   setLike(like ? false : true);
// };

function PhotoFavButton(props) {
  const { photoId, favPhotos, setFavPhotos, onLikeClicked} = props;
  // console.log(`Photos liked: ${photoId}`);
  
  // const [like, setLike] = useState(false);
  return (
    <div className="photo-list__fav-icon" onClick={() => onLikeClicked(favPhotos, setFavPhotos, photoId)}>
      <div className="photo-list__fav-icon-svg">
        <FavIcon selected={favPhotos.includes(photoId)} />
      </div>
    </div>
  );
}

export default PhotoFavButton;