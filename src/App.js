import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

import AuthContainer from './components/Auth/AuthContainer';
import Signin from './components/Auth/Signin';
import FaceRecognition from './components/FaceRecognition/FaceRecognitionContainer';

// import Particles from 'react-particles-js';
// import Navigation from './components/Navigation/Navigation';
// import FaceRecognition from './components/FaceRecognition/FaceRecognition';
// import Logo from './components/Logo/Logo';
// import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
// import Rank from './components/Rank/Rank';
import './App.css';

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  body {
    font-family: 'Nanum Gothic', sans-serif;
    font-size: 16px;
    line-height: 1.3em;
    background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
`;

// const particlesOptions = {
//   particles: {
//     number: {
//       value: 120,
//       density: {
//         enable: true,
//         value_area: 800
//       }
//     }
//   }
// };

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      boxes: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    };
  }

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  };

  getFaceLocations = data => {
    const regions = data.outputs[0].data.regions;
    return regions.map(region => {
      return this.calculateFaceLocation(region);
    });
  };

  calculateFaceLocation = region => {
    const clarifaiFace = region.region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  displayFaceBoxes = boxes => {
    this.setState({ boxes });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ boxes: [] });
    this.setState({ imageUrl: this.state.input });
    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState({
                user: {
                  ...this.state.user,
                  entries: count
                }
              });
            })
            .catch(console.log);
        }
        this.displayFaceBoxes(this.getFaceLocations(response));

        // response.outputs[0].data.regions[0].region_info.bounding_box
      })
      .catch(err => console.log(err));
  };

  onRouteChange = route => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageUrl, route, boxes } = this.state;
    console.log(this.state.user);
    return (
      <div className="App">
        <GlobalStyle />
        <Router>
          <Route
            path="/login"
            component={props => (
              <AuthContainer {...props} loadUser={this.loadUser} />
            )}
          />
          <Route
            path="/register"
            component={props => (
              <AuthContainer {...props} loadUser={this.loadUser} />
            )}
          />
          <PrivateRoute
            exact
            path="/"
            component={FaceRecognition}
            authenticated={this.state.user.id !== ''}
          />
        </Router>
        {/* <Particles className="particles" params={particlesOptions} /> */}
        {/* <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        /> */}
        {/* {route === 'home' ? ( */}
        {/* <> */}
        {/* <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />

            <FaceRecognition boxes={boxes} imageUrl={imageUrl} /> */}
        {/* </> */}
        {/* ) : route === 'signin' ? ( */}
        {/* // <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} /> */}
        {/* ) : ( */}
        {/* // <Register
          //   onRouteChange={this.onRouteChange}
          //   loadUser={this.loadUser}
          // /> */}
        {/* // )} */}
      </div>
    );
  }
}

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);
export default App;
