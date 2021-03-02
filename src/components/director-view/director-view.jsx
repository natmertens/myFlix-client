import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { MovieCard } from '../movie-card/movie-card.jsx';
import './director-view.scss';
import Card from 'react-bootstrap/Card';
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

    const directorMovies = movies.filter(movie =>
      movie.Director.Name.includes(director.Name));


    if (!director) return <div className="director-view" />;

    return (
      <div className="director-view" >
        <div>
          <h3 className="text-danger">{director.Name}</h3>
        </div>
        <div className="director-bio">
          <span>{director.Bio}</span>
        </div>
        <Link to={'/'}>
          <Button variant="danger">Back to Movies</Button>
        </Link>

        <div className="director-movies">
          <h3 className="text-danger">All Movies by {director.Name}</h3>
          <Container>
            <Row className="justify-content-md-center">
              {directorMovies.map(movie => (
                <Col md={3} key={movie._id} >
                  <MovieCard movie={movie} />
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
DirectorView.propTypes = {
  movies: PropTypes.array.isRequired,
};