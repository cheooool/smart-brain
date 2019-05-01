import React from 'react';
import Anchor from '../shared/Anchor';
import { Form, Legend, Fieldset, FormField } from '../shared/Forms';
import Text from '../shared/Text';
import TextInput from '../shared/TextInput';
import Button from '../shared/Button';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    };
  }
  onEmailChange = event => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ signInPassword: event.target.value });
  };

  onInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  onSubmitSignIn = e => {
    e.preventDefault();
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      });
    // console.log(this.state);
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <Form onSubmit={this.onSubmitSignIn}>
        <Fieldset>
          <Legend>SIGN IN</Legend>
          <FormField>
            <TextInput
              type="email"
              name="signInEmail"
              id="signInEmail"
              placeholder="Email"
              title="Email"
              onChange={this.onInputChange}
            />
          </FormField>
          <FormField>
            <TextInput
              type="password"
              name="signInPassword"
              id="signInPassword"
              placeholder="Password"
              onChange={this.onInputChange}
            />
          </FormField>
        </Fieldset>
        <Button type="submit">Sign In</Button>
        <Text size="0.875em">
          ID가 없으신가요?{' '}
          <Anchor onClick={() => onRouteChange('register')}>Register</Anchor>
        </Text>
      </Form>
    );
  }
}

export default Signin;
