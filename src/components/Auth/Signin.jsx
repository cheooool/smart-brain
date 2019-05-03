import React from 'react';

import {
  Link,
  Text,
  TextInput,
  Button,
  Form,
  Fieldset,
  Legend,
  Field,
  Alert
} from '../shared';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    };
  }
  componentDidMount() {
    this.props.onClearError();
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
    this.props.onSignIn({
      email: this.state.signInEmail,
      password: this.state.signInPassword
    });
  };

  render() {
    const { error } = this.props;
    return (
      <Form onSubmit={this.onSubmitSignIn}>
        <Fieldset>
          <Legend>SIGN IN</Legend>
          <Field>
            <TextInput
              type="email"
              name="signInEmail"
              id="signInEmail"
              placeholder="Email"
              title="Email"
              autoComplete="off"
              onChange={this.onInputChange}
            />
          </Field>
          <Field>
            <TextInput
              type="password"
              name="signInPassword"
              id="signInPassword"
              placeholder="Password"
              autoComplete="off"
              onChange={this.onInputChange}
            />
          </Field>
        </Fieldset>
        {error.map((message, index) => {
          return (
            <Alert className="error" key={index}>
              {message}
            </Alert>
          );
        })}
        <Button type="submit">Sign In</Button>
        <Text size="0.875em">
          ID가 없으신가요? <Link to="/register">Register</Link>
        </Text>
      </Form>
    );
  }
}

export default Signin;
