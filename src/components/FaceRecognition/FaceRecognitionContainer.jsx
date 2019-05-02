import React, { Component } from 'react';
import Header from '../Header/Header';
import Counter from '../Counter/Counter';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';
import FaceRecognition from './FaceRecognition';
import DetectCounter from './DetectCounter';

class FaceRecognitionContainer extends Component {
  state = {
    boxes: [],
    linkInput: '',
    imageUrl: ''
  };

  getFaceLocations = data => {
    const regions = data.outputs[0].data.regions;
    return regions.map(region => {
      return this.calculateFaceLocation(region);
    });
  };

  convertToPercent = num1 => num2 => (num2 / num1) * 100;

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
    const convertToPercent = {
      top: convertHeightTo(positions.top),
      right: convertWidthTo(positions.right),
      bottom: convertHeightTo(positions.bottom),
      left: convertWidthTo(positions.left)
    };

    return convertToPercent;
  };

  displayFaceBoxes = boxes => {
    this.setState({ boxes });
  };

  onInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  clearData = () => {
    this.setState({ boxes: [] });
    this.setState({ imageUrl: '' });
  };

  onDetectSubmit = async e => {
    e.preventDefault();
    this.clearData();
    this.setState({
      imageUrl: this.state.linkInput
    });
    const { user } = this.props;
    const clarifaiResponse = await fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.linkInput
      })
    });
    const clarifaiData = await clarifaiResponse.json();

    if (clarifaiData) {
      const entriesResponse = await fetch('http://localhost:3000/image', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: user.id
        })
      });

      const entriesData = entriesResponse.json();

      const boxesPosition = this.getFaceLocations(clarifaiData);
      this.displayFaceBoxes(boxesPosition);
    }
  };

  render() {
    const { boxes, imageUrl } = this.state;
    return (
      <>
        <Header />
        {/* <Counter name={user.name} entries={user.entries} /> */}
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onDetectSubmit={this.onDetectSubmit}
        />
        <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
        {boxes.length > 0 && <DetectCounter counter={boxes.length} />}
      </>
    );
  }
}

export default FaceRecognitionContainer;
