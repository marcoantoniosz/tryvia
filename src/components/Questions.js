import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { decode } from 'he';
import fetchQuestions from '../helpers/fetchQuestions';
import { getTokenThunk, saveScore, correctAnswer } from '../redux/actions';
import '../App.css';
import { ONE_SECOND, LIMIT_BUTTON_TIMER, INICIAL_POINTS, EXPIDER_TOKEN_RESULT,
  EASY, MEDIUM, HARD, LIMIT_INDEX_QUESTIONS } from '../helpers/consts';
import '../styles/Questions.css';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      index: 0,
      wrongAs: '',
      rightAs: '',
      timer: 30,
      question: {},
      shuffleOptions: [],
      nextEnable: false,
      isDisabled: true,
    };
  }

  async componentDidMount() {
    await this.handleQuestions();
    this.startTimer();
    const { gravatarEmail, name } = this.props;
    const emailHash = md5(gravatarEmail).toString();
    const image = (`https://www.gravatar.com/avatar/${emailHash}`);
    const dados = JSON.parse(localStorage.getItem('ranking'));
    if (dados) {
      const playerIndex = dados.findIndex((dado) => dado.name === name);
      if (playerIndex >= 0) {
        dados[playerIndex].score = 0;
        localStorage.setItem('ranking', JSON.stringify(dados));
      } else {
        localStorage.setItem('ranking', JSON.stringify(
          [...dados, { name, score: 0, picture: image }],
        ));
      }
    } else {
      localStorage.setItem('ranking', JSON.stringify([
        { name, score: 0, picture: image }]));
    }
  }

  startTimer = () => {
    const Interval = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
      const { timer } = this.state;
      if (timer === LIMIT_BUTTON_TIMER) {
        this.setState({ isDisabled: false });
      }
      if (timer === 0) {
        clearInterval(Interval);
        this.handleAnswer();
      }
    }, ONE_SECOND);
  }

  handleQuestions = async () => {
    const { index } = this.state;
    const { token, getTokenProp } = this.props;
    const { response_code: responseCode, results } = await fetchQuestions(token);
    if (responseCode === EXPIDER_TOKEN_RESULT || token === '') {
      await getTokenProp();
      return this.handleQuestions();
    }
    this.setState({
      results, question: results[index],
    }, localStorage.setItem('token', token));
    this.getOptions();
  }

  getOptions = () => {
    const { question } = this.state;
    const answerOptions = [question.correct_answer, ...question.incorrect_answers];
    const shuffleOptions = this.shuffleArray(answerOptions);
    this.setState({ shuffleOptions });
  }

  handleClick = () => {
    const { results, index } = this.state;
    this.setState((prevState) => ({
      index: prevState.index + 1,
      wrongAs: '',
      rightAs: '',
      nextEnable: false,
    }));
    if (index === LIMIT_INDEX_QUESTIONS) {
      const { push } = this.props;
      push('/feedback');
    }
    this.setState({
      question: results[index + 1], timer: 30, isDisabled: true },
    () => this.getOptions());
    this.startTimer();
  }
  // FONTE: https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/

  shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
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

  handleAnswer = () => {
    this.setState({
      wrongAs: '3px solid rgb(255, 0, 0)',
      rightAs: '3px solid rgb(6, 240, 15)',
      nextEnable: true,
      isDisabled: true,
    });
  }

  getPoints = (dificulty, timer) => {
    let points;
    switch (dificulty) {
    case 'easy':
      points = INICIAL_POINTS + (timer * EASY);
      break;
    case 'medium':
      points = INICIAL_POINTS + (timer * MEDIUM);
      break;
    case 'hard':
      points = INICIAL_POINTS + (timer * HARD);
      break;
    default:
      break;
    }
    const { name, saveScoreProp } = this.props;
    const dados = JSON.parse(localStorage.getItem('ranking'));
    const playerIndex = dados.findIndex((dado) => dado.name === name);
    dados[playerIndex].score += points;
    saveScoreProp(dados[playerIndex].score);
    localStorage.setItem('ranking', JSON.stringify(dados));
  }

  handleClickAnswer = (event, correct) => {
    const { correctAnswerProp } = this.props;
    this.handleAnswer();
    if (event.target.value === correct) {
      correctAnswerProp();
      const { timer, question } = this.state;
      this.getPoints(question.difficulty, timer);
    }
    this.setState({ timer: 1 });
  }

  styleChange = (option, correct) => {
    const { wrongAs, rightAs } = this.state;
    if (option === correct) return { border: rightAs };
    return { border: wrongAs };
  }

  render() {
    const nextBtn = (
      <button
        className="Next_Button"
        type="button"
        data-testid="btn-next"
        onClick={ this.handleClick }
      >
        Próxima
      </button>
    );
    const { question, shuffleOptions, timer, nextEnable, isDisabled } = this.state;
    if (Object.keys(question).length > 0) {
      return (
        <div>
          <span className="Timer">{ timer }</span>
          <h2 data-testid="question-category" className="Category">
            {decode(question.category)}
          </h2>
          <p
            data-testid="question-text"
            className="Question"
          >
            {decode(question.question)}
          </p>
          <div data-testid="answer-options">
            {
              shuffleOptions.map((option, index) => (
                <button
                  className="Options_Button"
                  value={ option }
                  key={ index }
                  type="button"
                  style={ this.styleChange(option, question.correct_answer) }
                  onClick={ (event) => this.handleClickAnswer(event,
                    question.correct_answer) }
                  data-testid={
                    this.verifyAnswer(question.correct_answer, option,
                      question.incorrect_answers)
                  }
                  disabled={ isDisabled }
                >
                  {decode(option)}
                </button>
              ))
            }
          </div>
          { nextEnable && nextBtn }
        </div>
      );
    }
    return (
      <div> Loading </div>
    );
  }
}

Questions.propTypes = {
  token: propTypes.string,
  getTokenProp: propTypes.func,
  gravatarEmail: propTypes.string,
  name: propTypes.string,
  saveScoreProp: propTypes.func,
  push: propTypes.func,
  correctAnswerProp: propTypes.func,
}.isRequired;

const mapStateToProps = ({ token, player }) => ({
  token,
  name: player.name,
  gravatarEmail: player.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  getTokenProp: () => dispatch(getTokenThunk()),
  saveScoreProp: (payload) => dispatch(saveScore(payload)),
  correctAnswerProp: () => dispatch(correctAnswer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
