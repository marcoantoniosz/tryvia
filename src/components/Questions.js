import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import fetchQuestions from '../helpers/fetchQuestions';
import { getTokenThunk } from '../redux/actions';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      results: {},
      index: 0,
    };
  }

  async componentDidMount() {
    await this.handleQuestions();
  }

  handleQuestions = async () => {
    const EXPIDER_TOKEN_RESULT = 3;
    const { token, getTokenProp } = this.props;
    const { response_code: responseCode, results } = await fetchQuestions(token);
    if (responseCode === EXPIDER_TOKEN_RESULT || token === '') {
      await getTokenProp();
      return this.handleQuestions();
    }
    this.setState({
      results,
    }, localStorage.setItem('token', token));
  }

  getQuestions = () => {
    const { results, index } = this.state;
    if (Object.keys(results).length > 0) {
      return results[index];
    }
    return false;
  }

  handleClick = () => {
    this.setState((prevState) => ({
      index: prevState.index + 1,
    }));
  }
  // FONTE: https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/

  shuffleArray = (arr) => {
    // Loop em todos os elementos
    for (let i = arr.length - 1; i > 0; i -= 1) {
    // Escolhendo elemento aleatório
      const j = Math.floor(Math.random() * (i + 1));
      // Reposicionando elemento
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Retornando array com aleatoriedade
    return arr;
  }

  verifyAnswer = (correct, option, incorrect) => {
    if (correct === option) {
      return 'correct-answer';
    }
    let teste;
    incorrect.forEach((element, i) => {
      if (element === option) teste = i;
    });
    return `wrong-answer-${teste}`;
  }

  render() {
    const question = this.getQuestions();
    if (question) {
      const answerOptions = [question.correct_answer, ...question.incorrect_answers];
      const shuffleOptions = this.shuffleArray([...answerOptions]);
      return (
        <div>
          <h2 data-testid="question-category">{question.category}</h2>
          <p data-testid="question-text">{question.question}</p>
          <div data-testid="answer-options">
            {
              shuffleOptions.map((option, index) => (
                <button
                  key={ index }
                  type="button"
                  data-testid={
                    this.verifyAnswer(question.correct_answer,
                      option,
                      question.incorrect_answers)
                  }
                >
                  {option}
                </button>
              ))
            }
          </div>
          <button type="button" onClick={ this.handleClick }>
            Próxima
          </button>
        </div>
      );
    }
    return (
      <div>
        Loading
      </div>
    );
  }
}

Questions.propTypes = {
  token: propTypes.string.isRequired,
  getTokenProp: propTypes.func.isRequired,
};

const mapStateToProps = ({ token }) => ({
  token,
});

const mapDispatchToProps = (dispatch) => ({
  getTokenProp: () => dispatch(getTokenThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
