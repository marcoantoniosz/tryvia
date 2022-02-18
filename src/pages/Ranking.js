import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/Ranking.css';

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
        <header>
          <h1 className="ranking_title" data-testid="ranking-title">
            Ranking
          </h1>
        </header>
        <div className="rank_content">
          {
            dados.map(({ name, picture, score }, index) => (
              <div key={ index } className="player_card">

                <img src={ picture } alt={ name } className="player_image" />
                <h2
                  className="ranking_subtitle"
                  data-testid={ `player-name-${index}` }
                >
                  {name}

                </h2>
                <h2
                  className="ranking_subtitle"
                  data-testid={ `player-score-${index}` }
                >
                  {score}

                </h2>
              </div>
            ))
          }
        </div>
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
