import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Signin from './Signin';
import Register from './Register';

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

class AuthContainer extends Component {
  onRouteFrom = () => {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    this.props.history.push(from);
  };
  render() {
    const { pathname } = this.props.location;
    const { loadUser } = this.props;

    return (
      <Container>
        {pathname === '/login' ? (
          <Signin onRouteFrom={this.onRouteFrom} loadUser={loadUser} />
        ) : (
          <Register onRouteFrom={this.onRouteFrom} loadUser={loadUser} />
        )}
      </Container>
    );
  }
}

export default withRouter(AuthContainer);
