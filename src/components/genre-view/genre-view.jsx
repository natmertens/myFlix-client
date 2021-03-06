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
    console.log(genre);

    /*create new array of movies with a specific genre*/
    const genreMovies = movies.filter(movie =>
      movie.Genre.Name.includes(genre.Genre.Name));

    if (!genre) return null;

    return (
      <div className="genre-view" >
        <div>
          <h3 className="text-danger">{genre.Genre.Name}</h3>
        </div>
        <div className="genre-description">
          <span >{genre.Genre.Description}</span>
        </div>

        <div className="genre-movies text-center">
          <h3 className="text-danger">{genre.Genre.Name} Genre Movies </h3>
          <Container>
            <Row className="justify-content-md-center">
              {genreMovies.map(movie => (
                <Col md={3} key={movie._id} >
                  <MovieCard movie={movie} />
                </Col>)
              )}
            </Row>
          </Container>
          <Link to={'/'}>
            <Button variant="danger">Back to Movies</Button>
          </Link>
        </div>
      </div>
    );
  }
}

/*Definition of prop types*/
GenreView.propTypes = {
  movies: PropTypes.array.isRequired,
  genre: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};