import axios from 'axios';
import api from '../api';

export const REQUEST_FACE_RECOGNITION_PENDING =
  'REQUEST_FACE_RECOGNITION_PENDING';
export const REQUEST_FACE_RECOGNITION_SUCCESS =
  'REQUEST_FACE_RECOGNITION_SUCCESS';
export const REQUEST_FACE_RECOGNITION_FAILED =
  'REQUEST_FACE_RECOGNITION_FAILED';
export const UPDATE_IMAGE_URL = 'CHANGE_IMAGE_URL';
export const CHANGE_LINK_INPUT = 'CHANGE_LINK_INPUT';
export const CLEAR_FACE_RECOGNITION = 'CLEAR_FACE_RECOGNITION';

export const clearFaceRecognition = () => {
  return {
    type: CLEAR_FACE_RECOGNITION
  };
};

export const changeLinkInputAction = ({ input }) => {
  return {
    type: CHANGE_LINK_INPUT,
    payload: input
  };
};

export const requestFaceRecognition = ({ input }) => async (
  dispatch,
  getState
) => {
  const { user } = getState().authReducer;

  dispatch({
    type: REQUEST_FACE_RECOGNITION_PENDING
  });
  dispatch({
    type: UPDATE_IMAGE_URL,
    payload: input
  });
  try {
    const clarifaiResponse = await axios.post(`${api}/imageurl`, {
      input
    });
    const clarifaiData = await clarifaiResponse.data;

    if (clarifaiData) {
      const entriesResponse = await axios.put(`${api}/image`, {
        id: user.id
      });
    }

    dispatch({
      type: REQUEST_FACE_RECOGNITION_SUCCESS,
      payload: clarifaiData
    });
  } catch (e) {
    dispatch({
      type: REQUEST_FACE_RECOGNITION_FAILED
    });
  }
};
