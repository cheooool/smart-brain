import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOutAction } from '../../actions/auth';
import Header from '../Header/Header';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';
import FaceRecognition from './FaceRecognition';
import Spinner from '../Spinner/Spinner';

import {
  requestFaceRecognition,
  changeLinkInputAction,
  clearFaceRecognition
} from '../../actions/faceRecognition';

class FaceRecognitionContainer extends Component {
  convertToPercent = num1 => num2 => (num2 / num1) * 100;

  getFaceLocations = data => {
    if (!data) {
      return [];
    }
    const regions = data.outputs[0].data.regions;
    return regions.map(region => {
      return this.calculateFaceLocation(region);
    });
  };

  calculateFaceLocation = region => {
    const clarifaiFace = region.region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    const positions = {
      top: clarifaiFace.top_row * height,
      right: width - clarifaiFace.right_col * width,
      bottom: height - clarifaiFace.bottom_row * height,
      left: clarifaiFace.left_col * width
    };

    const convertWidthTo = this.convertToPercent(width);
    const convertHeightTo = this.convertToPercent(height);
    const convertToPercentPositions = {
      top: convertHeightTo(positions.top),
      right: convertWidthTo(positions.right),
      bottom: convertHeightTo(positions.bottom),
      left: convertWidthTo(positions.left)
    };

    return convertToPercentPositions;
  };

  onInputChange = e => {
    this.props.onLinkInputChange(e.target.value);
  };

  onDetectSubmit = e => {
    e.preventDefault();
    this.props.onRequestFaceRecognition(this.props.linkInput);
  };

  render() {
    const {
      onSignOut,
      onClearData,
      user,
      pending,
      imageUrl,
      linkInput,
      clarifaiData
    } = this.props;
    return (
      <>
        <Header user={user} onSignOut={onSignOut} />
        <ImageLinkForm
          value={linkInput}
          onInputChange={this.onInputChange}
          onDetectSubmit={this.onDetectSubmit}
        />
        <FaceRecognition
          boxes={this.getFaceLocations(clarifaiData)}
          imageUrl={imageUrl}
          finished={!pending}
          onClear={onClearData}
        />
        <Spinner visible={pending} />
      </>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.authReducer;
  const {
    imageUrl,
    pending,
    linkInput,
    clarifaiData
  } = state.faceRecognitionReducer;
  return {
    user,
    linkInput,
    imageUrl,
    pending,
    clarifaiData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignOut: () => dispatch(signOutAction()),
    onRequestFaceRecognition: input =>
      dispatch(requestFaceRecognition({ input })),
    onLinkInputChange: input => dispatch(changeLinkInputAction({ input })),
    onClearData: () => dispatch(clearFaceRecognition())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FaceRecognitionContainer);
