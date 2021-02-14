import React from 'react';
import './movie-view.scss';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie, onClick } = this.props;

    if (!movie) return null;

    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>

          <Card.Text>
            <span className="label description">Description: </span>
            <span className="value">{movie.Description}</span>
          </Card.Text>

          <Card.Text>
            <span className="label genre">Genre: </span>
            <span className="value">{movie.Genre.Name}</span>
          </Card.Text>

          <Card.Text>
            <span className="label director">Director: </span>
            <span className="value">{movie.Director.Name}</span>
          </Card.Text>

          <Button variant="danger" onClick={() => onClick()}>Back</Button>
        </Card.Body>
      </Card>
    );
  }
}

/*Definition of prop types*/
MovieView.propTypes = {
  movie: PropTypes.shape({
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
  }).isRequired,
  onClick: PropTypes.func.isRequired
};