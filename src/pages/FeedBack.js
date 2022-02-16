import React, { Component } from 'react';
import Header from '../components/Header';

export default class FeedBack extends Component {
  render() {
    return (
      <div>
        <Header />
        <span
          data-testid="feedback-text"
        >
          MENSAGEM FeedBack
        </span>
      </div>
    );
  }
}
