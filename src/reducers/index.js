import { combineReducers } from 'redux';
import authReducer from './authReducer';
import faceRecognitionReducer from './faceRecognitionReducer';

const rootReducer = combineReducers({
  authReducer,
  faceRecognitionReducer
});

export default rootReducer;
