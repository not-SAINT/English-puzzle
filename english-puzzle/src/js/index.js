import * as handlers from './handlers';
import { getRoundDataTest } from './backend';
import { filterDataFromBackend, playSound } from './utils';
import { VOICE_URL, AUTOPLAY_KEY, TRANSLATE_KEY } from './options';
import { saveToLocalStorage, restoreAppPromts } from './worker';
import {
  setAutoPlayButton,
  setPromtButtons,
  clearTranslate,
} from './workWithDom';
import Round from './Round';

import '../css/style.css';
import '../css/style.scss';

let CUR_ROUND;
// let AUTO_PLAY;
let PROMTS;

const startNewRound = async (level, page) => {
  // get data
  const data = await getRoundDataTest();
  const filteredData = filterDataFromBackend(data);
  // create blocks
  CUR_ROUND = new Round(filteredData, PROMTS);

  CUR_ROUND.loadCurrSentence();
  // create
  //
};

const getNextSentence = () => {
  CUR_ROUND.nextStep();
};

const moveWordToLine = ({ target }) => {
  if (!target.classList.contains('word-card__moveable')) {
    return undefined;
  }

  if (target.classList.contains('word-card__preview')) {
    return CUR_ROUND.resetPosition(target);
  }

  if (target.classList.contains('word-card__moveable')) {
    CUR_ROUND.moveWord(target);
  }
  return undefined;
};

const playSentence = () => {
  const url = `${VOICE_URL}${CUR_ROUND.currentSentenceSound}`;
  playSound(url);
};

const checkWords = () => {
  CUR_ROUND.checkCurrentWordsPosition();
};

const changePromt = (promts, promtName, promtKey) => {
  const res = promts;
  res[promtName] = !promts[promtName];
  saveToLocalStorage(promtKey, res[promtName]);
  setPromtButtons(res);
  return res;
};

const onAutoPlayClick = () => {
  PROMTS = changePromt(PROMTS, 'autoplay', AUTOPLAY_KEY);
};

const onTranslateClick = () => {
  PROMTS = changePromt(PROMTS, 'translate', TRANSLATE_KEY);
  if (!PROMTS.translate) {
    clearTranslate();
  }
};

const checkSomething = () => {
  CUR_ROUND.resetStep();
};

const setupCurrentWords = () => {
  CUR_ROUND.setRestWords();
};

const setHandlers = () => {
  document
    .querySelector('.start-page__start')
    .addEventListener('click', handlers.onStartButtonClick);

  document
    .getElementById('autoplay')
    .addEventListener('click', onAutoPlayClick);

  document
    .getElementById('test')
    .addEventListener('click', handlers.onTestClick);

  document.getElementById('puzzle').addEventListener('click', moveWordToLine);

  document.getElementById('pronounce').addEventListener('click', playSentence);
  document
    .getElementById('translate')
    .addEventListener('click', onTranslateClick);

  document.getElementById('check').addEventListener('click', checkWords);
  document
    .getElementById('dontknow')
    .addEventListener('click', setupCurrentWords);
  document
    .getElementById('continue')
    .addEventListener('click', getNextSentence);

  // check something
  document.getElementById('go').addEventListener('click', checkSomething);
};

const loadState = () => {
  PROMTS = restoreAppPromts();

  setPromtButtons(PROMTS);
};

window.onload = () => {
  loadState();
  setHandlers();

  startNewRound();
};
