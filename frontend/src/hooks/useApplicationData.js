import { useReducer } from "react";

import photos from 'mocks/photos';
import topics from 'mocks/topics';

const ACTIONS = {
  FAV_PHOTO_TOGGLE: 'FAV_PHOTO_TOGGLE',
  SET_PHOTO_DATA: 'SET_PHOTO_DATA',
  SET_TOPIC_DATA: 'SET_TOPIC_DATA',
  SELECT_PHOTO: 'SELECT_PHOTO',
  DISPLAY_PHOTO_DETAILS: 'DISPLAY_PHOTO_DETAILS'
}

function reducer(state, action) {
  console.log(`Current State:`, state);
  console.log(`Current Action:`, action);
  const newState = {...state};
  switch (action.type) {
    case ACTIONS.FAV_PHOTO_TOGGLE:
      const newFavPhotos = [...state.likedPhotos];
      if (newFavPhotos.includes(String(action.payload))) {
        const trgtIndex = newFavPhotos.findIndex(x => x == String(action.payload));
        newFavPhotos.splice(trgtIndex, 1);
        newState.likedPhotos = newFavPhotos;
        return newState;
      } else {
        newState.likedPhotos = [...state.likedPhotos, action.payload];
        return newState;
      }

    case ACTIONS.SELECT_PHOTO:
      console.log(`Photo selected`);
      newState.photoClicked = action.payload;
      return newState;
  
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, { likedPhotos : [], photoClicked : {} });  

  const onLikeClicked = (id) => {
    dispatch({ type: `FAV_PHOTO_TOGGLE`, payload: id})
  };
  
  const onPhotoClicked = (data) => {
    dispatch({ type: `SELECT_PHOTO`, payload: data})
  };
  

  return { favPhotos: state.likedPhotos, photoClicked: state.photoClicked, onPhotoClicked, onLikeClicked, photos, topics };
};
