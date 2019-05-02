import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signInAction } from '../../actions/auth';
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
  render() {
    const { pathname } = this.props.location;
    const { loadUser, onSignIn, user } = this.props;

    if (user) {
      return <Redirect to="/" />;
    }

    return (
      <Container>
        {pathname === '/login' ? (
          <Signin onSignIn={onSignIn} />
        ) : (
          <Register onRouteFrom={this.onRouteFrom} loadUser={loadUser} />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignIn: ({ email, password }) =>
      dispatch(signInAction({ email, password }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AuthContainer));
