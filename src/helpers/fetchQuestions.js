const fetchQuestions = async (token) => {
  try {
    const promise = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await promise.json();
    return data;
  } catch (error) {
    return error;
  }
};

export default fetchQuestions;
