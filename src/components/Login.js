import React, { Component } from 'react';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      isDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validadeButton());
  }

  validadeButton = () => {
    const { name, email } = this.state;
    if (name.length > 0 && this.validateEmail(email)) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  // funcao para  validar email link: https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
  validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  render() {
    const { name, email, isDisabled } = this.state;
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
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}
