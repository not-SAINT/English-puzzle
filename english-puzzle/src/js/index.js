import * as handlers from './handlers';
import { getRoundDataTest } from './backend';
import { filterDataFromBackend, playSound } from './utils';
import { VOICE_URL, AUTOPLAY_KEY } from './options';
import { restoreFromLocalStorage, saveToLocalStorage } from './worker';
import { setAutoPlayButton } from './workWithDom';
import Round from './Round';

import '../css/style.css';
import '../css/style.scss';

let CUR_ROUND;
let AUTO_PLAY;

const startNewRound = async (level, page) => {
  // get data
  const data = await getRoundDataTest();
  const filteredData = filterDataFromBackend(data);
  // create blocks
  CUR_ROUND = new Round(filteredData);

  CUR_ROUND.loadCurrSentence();
  // create
  //
};

const getNextSentence = () => {
  CUR_ROUND.nextStep();
};

const moveWordToLine = ({ target }) => {
  if (target.classList.contains('word-card__preview')) {
    return CUR_ROUND.resetPosition(target);
  }

  if (target.classList.contains('word-card__moveable')) {
    CUR_ROUND.moveWord(target);
    // const r = moveWordToLine();
    // console.log(r);

    //

    // target.remove();
  }
  // const clickedElement = target.querySelector('.word-card');
  // clickedElement.remove();
  return undefined;
};

const playSentence = () => {
  // const audio = CUR_ROUND.currentSentenceSound;
  const url = `${VOICE_URL}${CUR_ROUND.currentSentenceSound}`;
  playSound(url);
  // console.log(url);
};

const checkWords = () => {
  CUR_ROUND.checkCurrentWordsPosition();
};

const onAutoPlayClick = () => {
  AUTO_PLAY = !AUTO_PLAY;

  saveToLocalStorage(AUTOPLAY_KEY, AUTO_PLAY);
  setAutoPlayButton(AUTO_PLAY);
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

  document.getElementById('go').addEventListener('click', startNewRound);
  document.getElementById('puzzle').addEventListener('click', moveWordToLine);

  document.getElementById('pronounce').addEventListener('click', playSentence);

  document.getElementById('check').addEventListener('click', checkWords);
  document
    .getElementById('continue')
    .addEventListener('click', getNextSentence);
};

const loadState = () => {
  const restoredAutoPlay = restoreFromLocalStorage(AUTOPLAY_KEY);

  if (restoredAutoPlay !== undefined) {
    AUTO_PLAY = restoredAutoPlay;
  } else {
    AUTO_PLAY = true;
  }
  setAutoPlayButton(AUTO_PLAY);
};

window.onload = () => {
  // CONTAINER = document.getElementById('container');
  loadState();
  setHandlers();
  // buildMenu();
  // createCategories();

  startNewRound();
};
