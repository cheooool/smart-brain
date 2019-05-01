import React from 'react';
import {
  Anchor,
  Text,
  TextInput,
  Button,
  Form,
  Fieldset,
  Legend,
  Field
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

  onSubmit = e => {
    e.preventDefault();
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      });
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
              onChange={this.onInputChange}
            />
          </Field>
          <Field>
            <TextInput
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={this.onInputChange}
            />
          </Field>
          <Field>
            <TextInput
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={this.onInputChange}
            />
          </Field>
          <Button type="submit">Register</Button>
          <Text size="0.875em">
            이미 ID가 있으신가요? <Anchor>Sign In</Anchor>
          </Text>
        </Fieldset>
      </Form>
      // <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      //   <main className="pa4 black-80">
      //     <form className="measure">
      //       <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      //         <legend className="f4 fw6 ph0 mh0">Register</legend>
      //         <div className="mt3">
      //           <label className="db fw6 lh-copy f6" htmlFor="name">
      //             Name
      //           </label>
      //           <input
      //             className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
      //             type="text"
      //             name="name"
      //             id="name"
      //             onChange={this.onChange}
      //           />
      //         </div>
      //         <div className="mt3">
      //           <label className="db fw6 lh-copy f6" htmlFor="email">
      //             Email
      //           </label>
      //           <input
      //             className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
      //             type="email"
      //             name="email"
      //             id="email"
      //             onChange={this.onChange}
      //           />
      //         </div>
      //         <div className="mv3">
      //           <label className="db fw6 lh-copy f6" htmlFor="password">
      //             Password
      //           </label>
      //           <input
      //             className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
      //             type="password"
      //             name="password"
      //             id="password"
      //             onChange={this.onChange}
      //           />
      //         </div>
      //       </fieldset>
      //       <div className="">
      //         <input
      //           className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
      //           type="button"
      //           value="Register"
      //           onClick={this.onSubmit}
      //         />
      //       </div>
      //     </form>
      //   </main>
      // </article>
    );
  }
}

export default Register;
