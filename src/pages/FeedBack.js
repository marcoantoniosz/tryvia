import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import Header from '../components/Header';
import '../styles/Feedback.css';

const MIN_POINTS = 3;

class FeedBack extends Component {
  render() {
    const { assertions, score } = this.props;
    return (
      <div>
        <Header />
        <span
          data-testid="feedback-text"
          className="text main"
        >
          { assertions < MIN_POINTS ? 'Could be better...' : 'Well Done!'}
        </span>
        <br />
        <p className="text">
          Pontos:
          {' '}
          <span data-testid="feedback-total-score" className="text">{ score }</span>
        </p>
        <p className="text">
          Total de Acertos:
          {' '}
          <span data-testid="feedback-total-question" className="text">{assertions}</span>
        </p>
        <Link to="/">
          <button
            data-testid="btn-play-again"
            type="button"
            className="Play_Button"
          >
            Play Again
          </button>
        </Link>
        <br />
        <Link to="/ranking">
          <button
            data-testid="btn-ranking"
            type="button"
            className="Ranking_Button"
          >
            Ver Ranking
          </button>
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
