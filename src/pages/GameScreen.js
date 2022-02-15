import React, { Component } from 'react';
import Header from '../components/Header';
import Questions from '../components/Questions';

export default class GameScreen extends Component {
  render() {
    return (
      <div>
        <Header />
        <Questions />
      </div>
    );
  }
}
