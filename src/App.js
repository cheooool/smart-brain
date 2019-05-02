import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  render() {
    const { authenticated } = this.props;
    return (
      <div className="App">
        <GlobalStyle />
        <Router>
          <Route
            path="/login"
            component={props => <AuthContainer {...props} />}
          />
          <Route
            path="/register"
            component={props => <AuthContainer {...props} />}
          />
          <PrivateRoute
            exact
            path="/"
            component={props => {
              return (
                <FaceRecognitionContainer
                  {...props}
                  updateUser={this.updateUser}
                />
              );
            }}
            authenticated={authenticated}
          />
        </Router>
        {/* <ParticlesWrapper params={particlesOptions} /> */}
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

const mapStateToProps = state => {
  return {
    authenticated: state.authReducer.authenticated
  };
};

export default connect(mapStateToProps)(App);
