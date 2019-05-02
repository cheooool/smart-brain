import {
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAILED,
  AUTHENTICATED_PENDING,
  UNAUTHENTICATED
} from '../actions/auth';

const initialState = {
  pending: false,
  authenticated: false,
  user: null
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATED_PENDING:
      return Object.assign({}, state, {
        pending: true
      });
    case AUTHENTICATED_SUCCESS:
      return Object.assign({}, state, {
        pending: false,
        authenticated: true,
        user: action.payload
      });
    case AUTHENTICATED_FAILED:
      return Object.assign({}, state, {
        pending: false
      });
    case UNAUTHENTICATED:
      return initialState;
    default:
      return state;
  }
};

export default AuthReducer;
