import { BACKEND_URL, BACKEND_URL_LAST_PART } from './options';
import textWords from './words.sample.0.5.json';

export const getRoundData = async (level, page) => {
  const url = `${BACKEND_URL}?group=${level}&page=${page}{BACKEND_URL_LAST_PART}`;
  const res = await fetch(url);

  return res.json(res);
};

export const getRoundDataTest = async () => {
  // const res = await fetch('./words.sample.0.5.json');

  // return res.json(res);
  return textWords;
};

export const getCountPagesPerLevel = async (level) => {
  const url = `${BACKEND_URL}/count?group=${level}${BACKEND_URL_LAST_PART}`;
  const res = await fetch(url);
  const data = await res.json(res);

  return data.count;
};

// https://afternoon-falls-25894.herokuapp.com/words/count?group=1&wordsPerExampleSentenceLTE=10&wordsPerPage=10
// https://afternoon-falls-25894.herokuapp.com/words?group=0&page=10&wordsPerExampleSentenceLTE=10&wordsPerPage=10