import { BACKEND_URL, BACKEND_URL_LAST_PART } from './options';

export const getRoundData = async ({ level, round }) => {
  const url = `${BACKEND_URL}?group=${level}&page=${round}${BACKEND_URL_LAST_PART}`;
  const res = await fetch(url);

  return res.json(res);
};

export const getCountRoundsPerLevel = async ({ level }) => {
  const url = `${BACKEND_URL}/count?group=${level}${BACKEND_URL_LAST_PART}`;
  const res = await fetch(url);
  const data = await res.json(res);

  return data.count;
};

// https://afternoon-falls-25894.herokuapp.com/words/count?group=1&wordsPerExampleSentenceLTE=10&wordsPerPage=10
// https://afternoon-falls-25894.herokuapp.com/words?group=0&page=10&wordsPerExampleSentenceLTE=10&wordsPerPage=10
