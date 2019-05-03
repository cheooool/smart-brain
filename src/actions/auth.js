import axios from 'axios';
import api from '../api';

export const AUTHENTICATED_SUCCESS = 'AUTHENTICATED_SUCCESS';
export const AUTHENTICATED_FAILED = 'AUTHENTICATED_FAILED';
export const AUTHENTICATED_PENDING = 'AUTHENTICATED_PENDING';
export const UNAUTHENTICATED = 'UNAUTHENTICATED';
export const CLEAR_ERROR_MESSAGES = 'CLEAR_ERROR_MESSAGES';

export const clearErrorMessages = () => {
  return {
    type: CLEAR_ERROR_MESSAGES
  };
};

export const signInAction = ({ email, password }) => async dispatch => {
  dispatch({ type: AUTHENTICATED_PENDING });
  dispatch({ type: CLEAR_ERROR_MESSAGES });
  try {
    const response = await axios.post(`${api}/signin`, {
      email,
      password
    });
    const user = response.data;
    dispatch({
      type: AUTHENTICATED_SUCCESS,
      payload: user
    });
  } catch (e) {
    dispatch({
      type: AUTHENTICATED_FAILED,
      payload: e.response.data
    });
  }
};

export const registerAction = ({ name, email, password }) => async dispatch => {
  dispatch({ type: AUTHENTICATED_PENDING });
  dispatch({ type: CLEAR_ERROR_MESSAGES });
  try {
    const response = await axios.post(`${api}/register`, {
      name,
      email,
      password
    });
    const user = response.data;
    dispatch({
      type: AUTHENTICATED_SUCCESS,
      payload: user
    });
  } catch (e) {
    dispatch({
      type: AUTHENTICATED_FAILED,
      payload: e.response.data
    });
  }
};

export const signOutAction = () => {
  return {
    type: UNAUTHENTICATED
  };
};
