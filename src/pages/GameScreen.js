import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';

export default class GameScreen extends Component {
  render() {
    const { history: { push } } = this.props;
    return (
      <div>
        <Header />
        <Questions push={ push } />
      </div>
    );
  }
}

GameScreen.propTypes = {
  History: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
}.isRequired;
