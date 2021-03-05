import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './profile-view.scss';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';


export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favorites: []
    };
  }

  /*get complete user data*/
  getUser(token) {
    const user = localStorage.getItem('user');
    axios.get(`https://natalies-myflix.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: response.data.Birthday.substring(0, 10),
          favorites: response.data.FavoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  /*Delete user*/
  handleDelete() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios.delete(`https://natalies-myflix.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        alert(user + ' was deleted');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open('/', '_self');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  /*remove a favorite movie*/
  removeFavoriteMovie(movieid) {
    console.log(movieid);
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    axios.delete(`https://natalies-myflix.herokuapp.com/users/${user}/movies/${movieid}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        console.log(response.data);
        this.componentDidMount();
      })
      .catch((err) => {
        console.log(err);
      });
  }


  render() {

    const { movies } = this.props;
    const { username, email, birthday, favorites } = this.state;
    const favoritesList = movies.filter((movie) => {
      return (favorites.indexOf(movie._id) !== -1);
    });

    if (!movies) return null;

    return (
      <div className="profile-view">
        <h3 className="text-danger">Profile</h3>
        <Form>

          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder={username} readOnly>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" placeholder={email} readOnly>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control type="text" placeholder={birthday} readOnly>
            </Form.Control>
          </Form.Group>

          <Link to={`/update/${username}`}>
            <Button variant="danger">Update Profile</Button>
          </Link>

          <Button variant="danger" onClick={() => this.handleDelete()}>Delete Profile</Button>

          <Link to={'/'}>
            <Button variant="danger">Back to Movies</Button>
          </Link>

        </Form>

        <div className="favorite-movies">
          <h3 className="text-danger">Your Favorite Movies</h3>

          <Container>
            <Row className="justify-content-md-center">
              {favoritesList.map((movie) => (


                <Col md={3} key={movie._id}>
                  <Card >
                    <Card.Img variant="top" src={movie.ImagePath} />
                    <Card.Body>
                      <Card.Title>{movie.Title}</Card.Title>
                      <Card.Text>{movie.Description}</Card.Text>
                      <Link to={`/movies/${movie._id}`}>
                        <Button variant="danger">Details</Button>
                      </Link>
                      <Button variant="danger" onClick={() => this.removeFavoriteMovie(movie._id)}>
                        Remove
                      </Button>
                    </Card.Body>
                  </Card>

                </Col>

              ))}
            </Row>
          </Container>
        </div>

      </div >
    );
  }
}

/*Definition of prop types*/
ProfileView.propTypes = {
  movies: PropTypes.array.isRequired
};