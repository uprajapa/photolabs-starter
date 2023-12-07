import { useReducer, useEffect } from "react";

// import photos from 'mocks/photos';
import axios from "axios";

const ACTIONS = {
  FAV_PHOTO_TOGGLE: 'FAV_PHOTO_TOGGLE',
  SET_PHOTO_DATA: 'SET_PHOTO_DATA',
  SET_TOPIC_DATA: 'SET_TOPIC_DATA',
  SELECT_PHOTO: 'SELECT_PHOTO',
  DISPLAY_PHOTO_DETAILS: 'DISPLAY_PHOTO_DETAILS',
  PAGE_LOADED: 'PAGE_LOADED',
  GET_PHOTOS_BY_TOPICS: 'GET_PHOTOS_BY_TOPICS',
  SEARCH_PHOTOS: 'SEARCH_PHOTOS'
}

function reducer(state, action) {
  const newState = { ...state };
  switch (action.type) {
    case ACTIONS.FAV_PHOTO_TOGGLE:
      const newFavPhotos = [...state.likedPhotos];
      if (newFavPhotos.includes(action.payload)) {
        console.log(`Inside if!`, state.likedPhotos);
        const trgtIndex = newFavPhotos.findIndex(x => x == String(action.payload));
        newFavPhotos.splice(trgtIndex, 1);
        newState.likedPhotos = newFavPhotos;
        return newState;
      } else {
        newState.likedPhotos = [...state.likedPhotos, action.payload];
        console.log(`Inside else`, newState.likedPhotos);
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

    case ACTIONS.GET_PHOTOS_BY_TOPICS:
      newState.photos = [];
      action.payload.forEach(photo => newState.photos.push(photo));
      return newState;

    case ACTIONS.PAGE_LOADED:
      newState.loading = true;
      return newState;

    case ACTIONS.SEARCH_PHOTOS:
      console.log(action.payload);
      if (action.payload.length > 0) {
        newState.searchInput = action.payload;
        newState.searchedPhotos = newState.photos.filter(photo => photo.user.username.includes(action.payload));
        return newState;
      } else { 
        newState.searchInput = action.payload;
        return newState;
      }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}


export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, { photos: [], topics: [], likedPhotos: [], photoClicked: {}, loading: false, searchInput: '', searchedPhotos: [] });

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/topics'
    })
      .then((data) => dispatch({ type: `SET_TOPIC_DATA`, payload: data.data }))
      .then(() => {
        axios.get('/api/photos')
          .then((res) => dispatch({ type: 'SET_PHOTO_DATA', payload: res.data }))
          .catch((err) => console.log(err.message))
      })
      .then(() => dispatch({ type: 'PAGE_LOADED' }))
      .catch(err => console.log(err))
  }, []);


  const onLikeClicked = (id) => {
    dispatch({ type: `FAV_PHOTO_TOGGLE`, payload: id })
  };

  const onPhotoClicked = (data) => {
    dispatch({ type: `SELECT_PHOTO`, payload: data })
  };


  const onCategorySelected = (id) => {
    axios
      .get(`/api/topics/photos/${id}`)
      .then(data => {
        console.log(data.data)
        dispatch({ type: `GET_PHOTOS_BY_TOPICS`, payload: data.data })
      })
      .catch(() => console.log("Error getting categories"))
  };

  return {
    favPhotos: state.likedPhotos,
    photoClicked: state.photoClicked,
    loading: state.loading,
    onPhotoClicked,
    onCategorySelected,
    onLikeClicked,
    photos: state.photos,
    topics: state.topics,
    searchInput: state.searchInput,
    dispatch,
    searchedPhotos: state.searchedPhotos
  };
};
