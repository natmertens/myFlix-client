import React, { useState } from 'react';
import './registration-view.scss';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  /* change registration state to true, go back to login view*/
  const handleRegistration = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onRegistration();
  }

  /*Registration form*/
  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </Form.Group>
      <Button variant="danger" type="submit" onClick={handleRegistration}>Submit</Button>
    </Form>
  );
}

/* Definition of prop types*/
RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired
};