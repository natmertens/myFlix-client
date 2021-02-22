import React from 'react';
import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card.jsx';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './genre-view.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class GenreView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genre, movies } = this.props

    const genreMovies = movies.filter(movie =>
      movie.Genre.Name.includes(genre.Name));

    if (!genre) return null;
    if (!movies) return null;

    return (
      <div className="genre-view" >
        <div>
          <h3 className="text-danger">{genre.Name}</h3>
        </div>
        <div className="genre-description">
          <span >{genre.Description}</span>
        </div>
        <Link to={'/'}>
          <Button variant="danger">Back to Movies</Button>
        </Link>

        <div className="genre-movies">
          <h3 className="text-danger">All {genre.Name} Genre Movies </h3>
          <Container>
            <Row className="justify-content-md-center">
              {genreMovies.map(movie => (
                <Col md={3}>
                  <MovieCard key={movie._id} movie={movie} />
                </Col>)
              )}
            </Row>
          </Container>
        </div>
      </div>
    );

  }

}

/*Definition of prop types*/
GenreView.propTypes = {
  movies: PropTypes.array.isRequired,
};