import axios from 'axios';
import api from '../api';

export const AUTHENTICATED_SUCCESS = 'AUTHENTICATED_SUCCESS';
export const AUTHENTICATED_FAILED = 'AUTHENTICATED_FAILED';
export const AUTHENTICATED_PENDING = 'AUTHENTICATED_PENDING';

export const signInAction = ({ email, password }) => async dispatch => {
  dispatch({ type: AUTHENTICATED_PENDING });
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
      type: AUTHENTICATED_FAILED
    });
  }
};
