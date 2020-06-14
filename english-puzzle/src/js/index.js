import * as handlers from './handlers';
import { getRoundData, getCountRoundsPerLevel } from './backend';
import { filterDataFromBackend, playSound } from './utils';
import {
  VOICE_URL,
  AUTOPLAY_KEY,
  TRANSLATE_KEY,
  BG_KEY,
  ROUND_SIZE,
  NEXT_ROUND_KEY,
  MAX_LEVEL,
} from './options';
import {
  saveToLocalStorage,
  restoreAppPromts,
  restoreNextRound,
} from './worker';
import {
  setPromtButtons,
  setPuzzleBackgroundImage,
  hideCardsImage,
  createSelectOptions,
  resetPuzzleField,
  setSelectWithAppState,
  isAllWordsSetted,
  switchButtonsToNextStep,
} from './workWithDom';
import Round from './Round';

import '../css/style.css';
import '../css/style.scss';

let CUR_ROUND;
// let AUTO_PLAY;
let PROMTS;
let APP_STATE;
let MAX_ROUND;

const startNewRound = async () => {
  // const { level, round } = APP_STATE;
  // get data
  // const data = await getRoundDataTest();
  const data = await getRoundData(APP_STATE);
  const filteredData = filterDataFromBackend(data);

  resetPuzzleField();
  // create blocks
  CUR_ROUND = new Round(APP_STATE, filteredData, PROMTS);

  CUR_ROUND.loadCurrSentence();
  // create
  //
};

const setNextRound = () => {
  let { level, round } = APP_STATE;

  if (round < MAX_ROUND) {
    round = +round;
  } else {
    level = +level;
    round = 1;
  }

  if (+level > MAX_LEVEL) {
    level = 1;
  }

  APP_STATE = {
    level,
    round,
  };

  console.log(`level ${level} round ${round}`);

  setSelectWithAppState(APP_STATE);
};

const onContinueClick = () => {
  const { currentStep } = CUR_ROUND;
  const lastRoundStep = ROUND_SIZE - 1;

  if (currentStep < lastRoundStep) {
    return CUR_ROUND.nextStep();
  }

  if (currentStep === lastRoundStep) {
    const url = `url('${CUR_ROUND.currentBackground}')`;

    setPuzzleBackgroundImage(url);

    return CUR_ROUND.endRound();
  }

  setPuzzleBackgroundImage('none');
  setNextRound();
  saveToLocalStorage(NEXT_ROUND_KEY, APP_STATE);
  startNewRound();

  return undefined;
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

  const cntWordsInCurrentStep = CUR_ROUND.currentSentence.length;

  let isStepComplited = false;

  if (isAllWordsSetted(cntWordsInCurrentStep)) {
    isStepComplited = CUR_ROUND.checkCurrentWordsPosition();
  }

  if (isStepComplited) {
    switchButtonsToNextStep();
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

const changePromt = (promts, promtName) => {
  const res = promts;
  res[promtName] = !promts[promtName];
  saveToLocalStorage(promtName, res[promtName]);
  setPromtButtons(res);
  return res;
};

const onAutoPlayClick = () => {
  PROMTS = changePromt(PROMTS, AUTOPLAY_KEY);
};

const onImageClick = () => {
  PROMTS = changePromt(PROMTS, BG_KEY);
  CUR_ROUND.showPromts();
};

const onTranslateClick = () => {
  PROMTS = changePromt(PROMTS, TRANSLATE_KEY);
  CUR_ROUND.showPromts();
};

const setAppState = () => {
  const selectLevel = document.getElementById('level');
  const selectRound = document.getElementById('round');
  const level = selectLevel.options[selectLevel.selectedIndex].value;
  const round = selectRound.options[selectRound.selectedIndex].value;

  APP_STATE = { level, round };

  // saveToLocalStorage(NEXT_ROUND_KEY, APP_STATE);
};

const setRoundsSelect = async () => {
  // console.log(
  //   `setRoundsSelect level ${APP_STATE.level} round ${APP_STATE.round}`
  // );
  const cntRoundsPerLevel = await getCountRoundsPerLevel(APP_STATE);

  // console.log(`cntRoundsPerLevel ${cntRoundsPerLevel} `);

  MAX_ROUND = cntRoundsPerLevel;

  createSelectOptions(cntRoundsPerLevel);
  setSelectWithAppState(APP_STATE);
};

const onPageChange = () => {
  console.log(`onPageChange =>`);

  setAppState();
  // load new round
  startNewRound();
};

const onLevelChange = () => {
  console.log(`onLevelChange =>`);

  setAppState();
  // load new pages
  setRoundsSelect();
  // load new round
  startNewRound();
};

// const checkSomething = () => {
//   hideCardsImage();
// };

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

  // document
  //   .getElementById('test')
  //   .addEventListener('click', handlers.onTestClick);

  document.getElementById('puzzle').addEventListener('click', moveWordToLine);

  document.getElementById('pronounce').addEventListener('click', playSentence);
  document
    .getElementById('translate')
    .addEventListener('click', onTranslateClick);
  document.getElementById('image').addEventListener('click', onImageClick);

  document.getElementById('check').addEventListener('click', checkWords);
  document
    .getElementById('idontknow')
    .addEventListener('click', setupCurrentWords);
  document
    .getElementById('continue')
    .addEventListener('click', onContinueClick);

  document.getElementById('level').addEventListener('change', onLevelChange);
  document.getElementById('round').addEventListener('change', onPageChange);

  // check something
  // document.getElementById('go').addEventListener('click', checkSomething);
};

const loadState = () => {
  PROMTS = restoreAppPromts();

  setPromtButtons(PROMTS);

  APP_STATE = restoreNextRound();

  // console.log(` level ${APP_STATE.level} round ${APP_STATE.round}`);

  setRoundsSelect();
};

window.onload = () => {
  loadState();
  setHandlers();

  startNewRound();
};
