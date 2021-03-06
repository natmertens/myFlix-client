import React from 'react';
import { connect } from 'react-redux';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './movie-list.scss';
import PropTypes from 'prop-types';

/*return new prop for component*/
const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MovieList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.includes(visibilityFilter));
  }

  if (!movies) return <div className="main-view" />;

  return <div className="movies-list">
    <VisibilityFilterInput visibilityFilter={visibilityFilter} />

    <Container>
      <Row className="justify-content-md-center row-margin-20">

        {filteredMovies.map(m => (
          <Col md={4} key={m._id}>
            <MovieCard className="movie-card" movie={m} />
          </Col>)
        )}

      </Row>
    </Container>

  </div>;
}

/*connect visibilityFilter state with component*/
export default connect(mapStateToProps)(MovieList);

/*Definition of prop types*/
MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
  visibilityFilter: PropTypes.string
};
