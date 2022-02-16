import { combineReducers } from 'redux';
import player from './player';
import token from './token';
import correctAnswer from './correctAns';

const rootReducer = combineReducers({
  correctAnswer,
  player,
  token,
});

export default rootReducer;
