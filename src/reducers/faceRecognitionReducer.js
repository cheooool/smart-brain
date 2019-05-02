import {
  REQUEST_FACE_RECOGNITION_SUCCESS,
  REQUEST_FACE_RECOGNITION_FAILED,
  REQUEST_FACE_RECOGNITION_PENDING,
  UPDATE_IMAGE_URL,
  CHANGE_LINK_INPUT
} from '../actions/faceRecognition';

const initialState = {
  pending: false,
  linkInput: '',
  clarifaiData: null,
  imageUrl: ''
};

const faceRecognitionReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_FACE_RECOGNITION_PENDING:
      return Object.assign({}, state, {
        pending: true
      });
    case REQUEST_FACE_RECOGNITION_SUCCESS:
      return Object.assign({}, state, {
        pending: false,
        clarifaiData: action.payload
      });
    case REQUEST_FACE_RECOGNITION_FAILED:
      return Object.assign({}, state, {
        pending: false
      });
    case UPDATE_IMAGE_URL:
      return Object.assign({}, state, {
        imageUrl: action.payload
      });
    case CHANGE_LINK_INPUT:
      return Object.assign({}, state, {
        linkInput: action.payload
      });
    default:
      return state;
  }
};

export default faceRecognitionReducer;
