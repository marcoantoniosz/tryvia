import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';

const MIN_POINTS = 3;

class FeedBack extends Component {
  render() {
    const { correctAns } = this.props;
    console.log(correctAns);
    return (
      <div>
        <Header />
        <span
          data-testid="feedback-text"
        >
          { correctAns < MIN_POINTS ? 'Could be better...' : 'Well Done!'}
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  correctAns: state.correctAnswer.correctAns,
});

FeedBack.propTypes = {
  correctAns: propTypes.number.isRequired,
};

export default connect(mapStateToProps)(FeedBack);
