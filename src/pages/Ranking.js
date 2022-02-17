import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import propTypes from 'prop-types';
import Header from '../components/Header';
import '../styles/Feedback.css';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      dados: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const dados = JSON.parse(localStorage.getItem('ranking'));
    const orderData = dados.sort((dadoA, dadoB) => dadoB.score - dadoA.score);
    console.log(orderData);
    if (orderData) return this.setState({ dados });
  }

  render() {
    const { dados } = this.state;
    if (dados.lenght === 0) return (<div>Nenhum dado disponível</div>);
    return (
      <div>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>

        {
          dados.map(({ name, picture, score }, index) => (
            <div key={ index }>
              <h2 data-testid={ `player-name-${index}` }>{name}</h2>
              <img src={ picture } alt={ name } />
              <h3 data-testid={ `player-score-${index}` }>{score}</h3>
            </div>
          ))
        }

        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
            className="Home_Button"
          >
            Play Again
          </button>
        </Link>
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
