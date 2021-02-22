import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LoginView } from '../login-view/login-view.jsx';
import { MovieCard } from '../movie-card/movie-card.jsx';
import { MovieView } from '../movie-view/movie-view.jsx';
import { RegistrationView } from '../registration-view/registration-view.jsx';
import { DirectorView } from '../director-view/director-view.jsx';
import { GenreView } from '../genre-view/genre-view.jsx';
import { ProfileView } from '../profile-view/profile-view.jsx';
import { UpdateView } from '../update-profile/update-profile.jsx';
import './main-view.scss';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MovieList } from '../movie-list/movie-list.jsx';
/*import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';*/


export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      user: null,
      registered: true
    };
  }

  getMovies(token) {
    axios.get('https://natalies-myflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /*get movie data from API*/
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }


  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    /*localStorage.setItem('userprofile', authData.user);*/
    this.getMovies(authData.token);
  }

  /*render() {
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
          <LoginView onLoggedIn={authData => this.onLoggedIn(authData)} onRequiredRegistration={() => this.onRequiredRegistration()} />
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

  }*/

  render() {
    const { movies, user } = this.state;

    if (!movies) return <div className="main-view" />;

    return (
      <Router>
        <div className="main-view">
          <Navbar bg="light" expand="md">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to={`/users/${user}`} target='_self'>Profile</Nav.Link>

              </Nav>

            </Navbar.Collapse>
          </Navbar>
          <Route exact path="/" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            return <MovieList movies={movies} />;
          }
          } />
          <Route path="/register" render={() => <RegistrationView />} />
          <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
          <Route path="/directors/:name" render={({ match }) => {
            if (!movies) return <div className="main-view" />;
            return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} movies={movies} />
          }
          } />
          <Route path="/genres/:name" render={({ match }) => {
            if (!movies) return <div className="main-view" />;
            return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} movies={movies} />
          }
          } />
          <Route path="/users/:username" render={({ match }) => {
            if (!user) return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />;
            return <ProfileView movies={movies} />
          }} />
          <Route path="/update/:username" render={({ match }) => {
            if (!user) return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />;
            return <UpdateView />
          }} />
        </div>
      </Router>
    );
  }
}



