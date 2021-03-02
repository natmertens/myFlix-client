import React from 'react';
import { connect } from 'react-redux';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

export function MovieList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.includes(visibilityFilter));
  }

  if (!movies) return <div className="main-view" />;

  return <div className="movies-list">
    <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    <Container>
      <Row className="justify-content-md-center">

        {filteredMovies.map(m => (
          <Col md={3} key={m._id}>
            <MovieCard movie={m} />
          </Col>)
        )}

      </Row>
    </Container>

  </div>;

}

export default connect(mapStateToProps)(MovieList);
