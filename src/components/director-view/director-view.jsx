import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { MovieCard } from '../movie-card/movie-card.jsx';
import './director-view.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class DirectorView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director, movies } = this.props
    console.log(director)

    /*create new array of movies by a specific director*/
    const directorMovies = movies.filter(movie =>
      movie.Director.Name.includes(director.Director.Name));

    if (!director) return null;

    return (
      <div className="director-view" >
        <div className="director-info">
          <div>
            <h3 className="text-danger">{director.Director.Name}</h3>
          </div>
          <div className="director-bio">
            <span className="label">Bio: </span>
            <span>{director.Director.Bio}</span>
          </div>
          <div className="director-birth">
            <span className="label">Birth: </span>
            <span>{director.Director.Birth}</span>
          </div>
          {director.Director.Death
            ? <div className="director-death">
              <span className="label">Death: </span>
              <span>{director.Director.Death}</span>
            </div>
            : <div className="director-death" />}
        </div>

        <div className="director-movies text-center">
          <h3 className="text-danger">Movies by {director.Director.Name}</h3>
          <Container>
            <Row className="justify-content-md-center">
              {directorMovies.map(movie => (
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
DirectorView.propTypes = {
  movies: PropTypes.array.isRequired,
  director: PropTypes.shape({
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