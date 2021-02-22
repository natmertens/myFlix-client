import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export class MovieList extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {

    const { movies } = this.props;

    if (!movies) return <div className="main-view" />;

    return <div className="movies-list">
      <Container>
        <Row className="justify-content-md-center">

          {movies.map(m => (
            <Col md={3}>
              <MovieCard key={m._id} movie={m} />
            </Col>)
          )}

        </Row>
      </Container>

    </div>;


  }
}