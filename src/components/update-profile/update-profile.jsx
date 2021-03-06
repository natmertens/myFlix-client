import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export function UpdateView(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const user = localStorage.getItem('user');

  /*update user data an direct user back to movie view*/
  const handleUpdate = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.put(`https://natalies-myflix.herokuapp.com/users/${user}`, {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        localStorage.setItem('user', data.Username)
        alert('Your profile was updated');
        window.open('/', '_self');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Form>
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
      <Button variant="danger" type="submit" onClick={handleUpdate}>Update</Button>
      <Link to={`/users/${user}`}>
        <Button variant="danger">Back to Profile</Button>
      </Link>
    </Form>
  );
}