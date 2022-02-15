import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { player: { name, gravatarEmail } } = this.props;
    const emailHash = md5(gravatarEmail).toString();
    const image = (`https://www.gravatar.com/avatar/${emailHash}`);
    return (
      <header style={ { display: 'flex' } }>
        <img
          src={ image }
          style={ { width: '60px' } }
          alt="gravatar_image"
          data-testid="header-profile-picture"
        />
        <h1
          data-testid="header-player-name"
        >
          { name }
        </h1>
        <span>
          Placar:
          <span data-testid="header-score">
            0
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
    assertions: propTypes.string.isRequired,
    gravatarEmail: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    score: propTypes.number.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);