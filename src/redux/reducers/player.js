import { PLAYER_DATA, SAVE_SCORE, CORRECT_ANSWER } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case PLAYER_DATA:
    return action.payload;
  case SAVE_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  case CORRECT_ANSWER:
    return { ...state,
      assertions: state.assertions + 1 };
  default:
    return state;
  }
}

export default player;
