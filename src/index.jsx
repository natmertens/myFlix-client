import React from 'react';
import ReactDOM from 'react-dom';
import { MainView } from './components/main-view/main-view.jsx';
import './index.scss';
import Container from 'react-bootstrap/Container';

class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container>
        <MainView />
      </Container>
    );
  }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MyFlixApplication), container);