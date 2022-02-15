import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';
import { getTokenThunk } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      isDisabled: true,
      toGameScreen: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validadeButton());
  }

  // funcao para  validar email link: https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
  validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  validadeButton = () => {
    const { name, email } = this.state;
    if (name.length > 0 && this.validateEmail(email)) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  // da um fetchAPI e salva o token na store, pega o token da store e salva no local storage, da o redirect
  clickButton = async (event) => {
    event.preventDefault();
    const { getTokenProp } = this.props;
    await getTokenProp();
    const { token } = this.props;
    localStorage.setItem('token', token);
    this.setState({ toGameScreen: true });
  }

  // função que encaminha para a página settings
  handleSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { name, email, isDisabled, toGameScreen } = this.state;
    return (
      <div>
        <form>
          <input
            type="text"
            name="name"
            value={ name }
            placeholder="Nome"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
          <input
            type="email"
            name="email"
            value={ email }
            placeholder="Email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            disabled={ isDisabled }
            data-testid="btn-play"
            onClick={ this.clickButton }
          >
            Play
          </button>
          {toGameScreen && <Redirect to="/game" />}
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleSettings }
          >
            Settings
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  getTokenProp: PropTypes.func,
  token: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  getTokenProp: () => dispatch(getTokenThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
