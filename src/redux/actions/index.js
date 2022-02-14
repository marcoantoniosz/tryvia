import fetchToken from '../../helpers/fetchToken';

export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';

export const getTokenSuccess = (payload) => ({
  type: GET_TOKEN_SUCCESS,
  payload,
});

export const getTokenThunk = () => async (dispatch) => {
  const tokenObj = await fetchToken();
  dispatch(getTokenSuccess(tokenObj.token));
};
