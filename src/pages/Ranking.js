import React, { Component } from 'react';
import { connect } from 'react-redux';
// import propTypes from 'prop-types';
import Header from '../components/Header';
import '../styles/Feedback.css';

class Ranking extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   assertions: state.player.assertions,
//   score: state.player.score,
// });

// Ranking.propTypes = {
//   assertions: propTypes.number.isRequired,
//   score: propTypes.number.isRequired,
// };

export default connect()(Ranking);
