import {
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAILED,
  AUTHENTICATED_PENDING,
  UNAUTHENTICATED,
  CLEAR_ERROR_MESSAGES,
  UPDATE_ENTRIES
} from '../actions/auth';

const initialState = {
  pending: false,
  authenticated: false,
  user: null,
  errorMessages: []
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
        pending: false,
        errorMessages: [...state.errorMessages, action.payload]
      });
    case UNAUTHENTICATED:
      return initialState;
    case CLEAR_ERROR_MESSAGES:
      return Object.assign({}, state, {
        errorMessages: []
      });
    case UPDATE_ENTRIES:
      return Object.assign({}, state, {
        user: {
          ...state.user,
          entries: action.payload
        }
      });
    default:
      return state;
  }
};

export default AuthReducer;
