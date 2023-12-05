import { useReducer, useEffect } from "react";

import photos from 'mocks/photos';
// import topics from 'mocks/topics';
import axios from "axios";

const ACTIONS = {
  FAV_PHOTO_TOGGLE: 'FAV_PHOTO_TOGGLE',
  SET_PHOTO_DATA: 'SET_PHOTO_DATA',
  SET_TOPIC_DATA: 'SET_TOPIC_DATA',
  SELECT_PHOTO: 'SELECT_PHOTO',
  DISPLAY_PHOTO_DETAILS: 'DISPLAY_PHOTO_DETAILS',
  PAGE_LOADED: 'PAGE_LOADED'
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
      newState.photoClicked = action.payload;
      return newState;
  
    case ACTIONS.SET_TOPIC_DATA:
      newState.topics = [];
      console.log(action.payload);
      action.payload.forEach(topic => newState.topics.push(topic));
      // newState.topics.push(action.payload);
      console.log(`State Value changes`);
      console.log(newState.topics);
      return newState;

    case ACTIONS.PAGE_LOADED:
      newState.loading = true;
      console.log(`State Value changes`);
      return newState;

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, { topics: [], likedPhotos : [], photoClicked : {}, loading: false });  

  useEffect(() => {
    console.log('Running axios req...');
    axios({
      method: 'GET',
      url: '/api/topics'
    })
    .then((data) => {
      console.log(data.data);
      // topics = data.data;
      dispatch({ type: `SET_TOPIC_DATA`, payload: data.data})
      // dispatch({ type: `PAGE_LOADED`})
    })
    .then(() => dispatch({type: 'PAGE_LOADED'}))
    .catch(err => console.log(err))
  }, []);

  const onLikeClicked = (id) => {
    dispatch({ type: `FAV_PHOTO_TOGGLE`, payload: id})
  };
  
  const onPhotoClicked = (data) => {
    dispatch({ type: `SELECT_PHOTO`, payload: data})
  };
  

  return { favPhotos: state.likedPhotos, photoClicked: state.photoClicked, loading: state.loading, onPhotoClicked, onLikeClicked, photos, topics: state.topics };
};
