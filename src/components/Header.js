import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import '../styles/Header.css';

class Header extends Component {
  render() {
    const { player: { name, gravatarEmail, score } } = this.props;
    const emailHash = md5(gravatarEmail).toString();
    const image = (`https://www.gravatar.com/avatar/${emailHash}`);
    return (
      <header className="Header_Content">
        <img
          className="Header_Image"
          src={ image }
          alt="gravatar_image"
          data-testid="header-profile-picture"
        />
        <h1
          className="Header_Title"
          data-testid="header-player-name"
        >
          {name}
        </h1>
        <span className="Header_Score">
          Placar:
          <span data-testid="header-score" className="Header_Score">
            {score}
          </span>
        </span>
      </header>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  player,
});

Header.propTypes = {
  player: propTypes.shape({
    gravatarEmail: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    score: propTypes.number.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
