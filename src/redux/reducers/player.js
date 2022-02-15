import { PLAYER_DATA } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case PLAYER_DATA:
    return action.payload;
  default:
    return state;
  }
}

export default player;
