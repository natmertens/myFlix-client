import React, { useState } from 'react';
import axios from 'axios';
import './login-view.scss';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://natalies-myflix.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
  };

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
      <Link to={'/register'}>
        <Button variant="danger">Register</Button>
      </Link>
    </Form>
  );
}


/*Definition of prop types*/
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};