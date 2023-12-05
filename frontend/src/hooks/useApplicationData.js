import { useReducer, useEffect } from "react";

// import photos from 'mocks/photos';
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
      action.payload.forEach(topic => newState.topics.push(topic));
      return newState;

    case ACTIONS.SET_PHOTO_DATA:
      newState.photos = [];
      action.payload.forEach(photo => newState.photos.push(photo));
      return newState;

    case ACTIONS.PAGE_LOADED:
      newState.loading = true;
      return newState;

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, { photos: [], topics: [], likedPhotos : [], photoClicked : {}, loading: false });  

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/topics'
    })
    .then((data) => dispatch({ type: `SET_TOPIC_DATA`, payload: data.data}))
    .then(() => {
      axios.get('/api/photos')
      .then((res) => dispatch({ type: 'SET_PHOTO_DATA', payload: res.data}))
      .catch((err) => console.log(err.message))
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
  

  return { favPhotos: state.likedPhotos, photoClicked: state.photoClicked, loading: state.loading, onPhotoClicked, onLikeClicked, photos: state.photos, topics: state.topics };
};
