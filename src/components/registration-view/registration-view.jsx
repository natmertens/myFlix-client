import React, { useState } from 'react';
import './registration-view.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');


  const handleRegistration = (e) => {
    e.preventDefault();
    /*console.log(username, password, email, birthday);
    props.onRegistration();*/
    axios.post('https://natalies-myflix.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self');
      })
      .catch(e => {
        console.log('Error registering the user')
      });
  }

  /*Registration form*/
  return (
    <Form>
      <h3 className="text-danger">Please register for an account</h3>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} required />
        <Form.Text className="text-muted">
          Username is required and must contain at least 5 characters
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <Form.Text className="text-muted">
          Password is required
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <Form.Text className="text-muted">
          Please enter a valid email address
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </Form.Group>
      <Button variant="danger" type="submit" onClick={handleRegistration}>Submit</Button>
    </Form>
  );
}
