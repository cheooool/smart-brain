import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  signInAction,
  registerAction,
  clearErrorMessages
} from '../../actions/auth';
import styled from 'styled-components';
import Signin from './Signin';
import Register from './Register';

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;

  & > form {
    flex: 1 1 auto;
  }
`;

const FormWrapper = styled.div`
  flex: 1 1 auto;
  width: 100%;
  max-width: 640px;
  padding: 1em;
  box-sizing: border-box;
  text-align: center;
`;

class AuthContainer extends Component {
  render() {
    const { pathname } = this.props.location;
    const {
      onSignIn,
      onRegister,
      onClearError,
      user,
      errorMessages
    } = this.props;

    if (user) {
      return <Redirect to="/" />;
    }

    return (
      <Container>
        <FormWrapper>
          {pathname === '/login' ? (
            <Signin
              onSignIn={onSignIn}
              error={errorMessages}
              onClearError={onClearError}
            />
          ) : (
            <Register
              onRegister={onRegister}
              error={errorMessages}
              onClearError={onClearError}
            />
          )}
        </FormWrapper>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    errorMessages: state.authReducer.errorMessages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignIn: ({ email, password }) =>
      dispatch(signInAction({ email, password })),
    onRegister: ({ name, email, password }) =>
      dispatch(registerAction({ name, email, password })),
    onClearError: () => dispatch(clearErrorMessages())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AuthContainer));
