import React from 'react';
import axios from 'axios';
import { LoginView } from '../login-view/login-view.jsx';
import { MovieCard } from '../movie-card/movie-card.jsx';
import { MovieView } from '../movie-view/movie-view.jsx';
import { RegistrationView } from '../registration-view/registration-view.jsx';
import './main-view.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      registered: true
    };
  }

  /*get movie data from API*/
  componentDidMount() {
    axios.get('https://natalies-myflix.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /*functions to change initial states*/
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onButtonClick() {
    this.setState({
      selectedMovie: null
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRequiredRegistration() {
    this.setState({
      registered: false
    });
  }

  onRegistration() {
    this.setState({
      registered: true
    })
  }



  render() {
    const { movies, selectedMovie, user, registered } = this.state;

    if (!registered) return (
      <Row className="main-view justify-content-md-center">
        <Col md={6}>
          <RegistrationView onRegistration={() => this.onRegistration()} />
        </Col>
      </Row>
    );

    if (!user) return (
      <Row className="main-view justify-content-md-center">
        <Col md={6}>
          <LoginView onLoggedIn={user => this.onLoggedIn(user)} onRequiredRegistration={() => this.onRequiredRegistration()} />
        </Col>
      </Row>
    );

    if (!movies) return <div className="main-view" />;

    return (
      <Row className="main-view justify-content-md-center">
        {selectedMovie
          ? (
            <Col md={3}>
              <MovieView movie={selectedMovie} onClick={() => this.onButtonClick()} />
            </Col>
          )
          : movies.map(movie => (
            <Col md={3}>
              <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
            </Col>
          ))
        }
      </Row>
    );

  }
}



