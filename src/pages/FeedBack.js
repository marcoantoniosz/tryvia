import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import Header from '../components/Header';

const MIN_POINTS = 3;

class FeedBack extends Component {
  render() {
    const { assertions, score } = this.props;
    console.log(assertions);
    return (
      <div>
        <Header />
        <span
          data-testid="feedback-text"
        >
          { assertions < MIN_POINTS ? 'Could be better...' : 'Well Done!'}
        </span>
        <br />
        <p>
          Pontos:
          {' '}
          <span data-testid="feedback-total-score">{ score }</span>
        </p>
        <p>
          Total de Acertos:
          {' '}
          <span data-testid="feedback-total-question">{assertions}</span>
        </p>
        <Link to="/">
          <button data-testid="btn-play-again" type="button">Play Again</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

FeedBack.propTypes = {
  assertions: propTypes.number.isRequired,
  score: propTypes.number.isRequired,
};

export default connect(mapStateToProps)(FeedBack);
