import { CORRECT_ANSWER } from '../actions';

const INITIAL_STATE = {
  correctAns: 0,
};

function correctAnswer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case CORRECT_ANSWER:
    return { correctAns: state.correctAns + 1 };
  default:
    return state;
  }
}

export default correctAnswer;
