import React from 'react';
import {
  Text,
  TextInput,
  Button,
  Form,
  Fieldset,
  Legend,
  Field,
  Link
} from '../shared';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: ''
    };
  }

  onInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    });
    const user = await response.json();

    if (user.id) {
      this.props.loadUser(user);
      this.props.onRouteFrom();
    }
  };
  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Fieldset>
          <Legend>REGISTER</Legend>
          <Field>
            <TextInput
              id="name"
              name="name"
              placeholder="Name"
              autoComplete="off"
              onChange={this.onInputChange}
            />
          </Field>
          <Field>
            <TextInput
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              autoComplete="off"
              onChange={this.onInputChange}
            />
          </Field>
          <Field>
            <TextInput
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              autoComplete="off"
              onChange={this.onInputChange}
            />
          </Field>
          <Button type="submit">Register</Button>
          <Text size="0.875em">
            이미 ID가 있으신가요? <Link to="/login">Sign In</Link>
          </Text>
        </Fieldset>
      </Form>
    );
  }
}

export default Register;
