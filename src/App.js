import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import Particles from 'react-particles-js';
import AuthContainer from './components/Auth/AuthContainer';
import FaceRecognitionContainer from './components/FaceRecognition/FaceRecognitionContainer';
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

const ParticlesWrapper = styled(Particles)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
`;

const particlesOptions = {
  particles: {
    number: {
      value: 120,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
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

  updateUser = user => {
    this.setState({
      user
    });
  };

  render() {
    const { user } = this.state;
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
            component={props => {
              return (
                <FaceRecognitionContainer
                  {...props}
                  user={user}
                  updateUser={this.updateUser}
                />
              );
            }}
            authenticated={this.state.user.id !== ''}
          />
        </Router>
        <ParticlesWrapper params={particlesOptions} />
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
