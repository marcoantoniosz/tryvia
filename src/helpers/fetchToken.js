const fetchToken = async () => {
  try {
    const promise = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await promise.json();
    return data;
  } catch (error) {
    return error;
  }
};

export default fetchToken;
