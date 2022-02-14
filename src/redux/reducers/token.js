import { GET_TOKEN_SUCCESS } from '../actions';

function token(state = '', action) {
  switch (action.type) {
  case GET_TOKEN_SUCCESS:
    return action.payload;
  default:
    return state;
  }
}

export default token;
