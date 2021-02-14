import React, { useState } from 'react';
import './login-view.scss';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  /*changes state of username*/
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username);
  };

  /*changes registration state and leads to registration form*/
  const handleRequiredRegistration = () => {
    props.onRequiredRegistration();
  }

  /*Login form*/
  return (
    <Form>
      <h1 className="text-danger">Welcome to myFlix!</h1>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="danger" type="submit" onClick={handleSubmit}>Log in</Button>
      <Button variant="danger" onClick={handleRequiredRegistration}>Register</Button>
    </Form>
  );
}


/*Definition of prop types*/
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  onRequiredRegistration: PropTypes.func.isRequired
};