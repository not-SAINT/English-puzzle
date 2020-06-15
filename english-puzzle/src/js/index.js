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
  createSelectOptions,
  resetPuzzleField,
  setSelectWithAppState,
  isAllWordsSetted,
  switchButtonsToNextStep,
  fillModal,
} from './workWithDom';
import Round from './Round';

import '../css/style.css';
import '../css/style.scss';

let CUR_ROUND;
let PROMTS;
let APP_STATE;
let MAX_ROUND;

const startNewRound = async () => {
  const data = await getRoundData(APP_STATE);
  const filteredData = filterDataFromBackend(data);

  resetPuzzleField();
  CUR_ROUND = new Round(APP_STATE, filteredData, PROMTS);
  CUR_ROUND.loadCurrSentence();
};

const setNextRound = () => {
  let { level, round } = APP_STATE;

  if (round < MAX_ROUND) {
    round = +round + 1;
  } else {
    level = +level + 1;
    round = 0;
  }

  if (+level > MAX_LEVEL) {
    level = 0;
  }

  APP_STATE = {
    level,
    round,
  };

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

    fillModal(CUR_ROUND.roundResults);
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

  const cntWordsInCurrentStep = CUR_ROUND.currentWords.length;

  let isStepComplited = false;

  if (isAllWordsSetted(cntWordsInCurrentStep)) {
    isStepComplited = CUR_ROUND.checkCurrentWordsPosition();
  }

  if (isStepComplited) {
    CUR_ROUND.showRestPromts();
    CUR_ROUND.addResults('iknow');
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
};

const setRoundsSelect = async () => {
  const cntRoundsPerLevel = await getCountRoundsPerLevel(APP_STATE);

  MAX_ROUND = cntRoundsPerLevel - 1;

  createSelectOptions(cntRoundsPerLevel);
  setSelectWithAppState(APP_STATE);
};

const onPageChange = () => {
  setAppState();
  startNewRound();
};

const onLevelChange = () => {
  setAppState();
  setRoundsSelect();
  startNewRound();
};

const onIdontknowClick = () => {
  CUR_ROUND.setRestWords();
};

const setHandlers = () => {
  document
    .querySelector('.start-page__start')
    .addEventListener('click', handlers.onStartButtonClick);

  document
    .getElementById('closemodal')
    .addEventListener('click', handlers.onModalClose);

  document
    .getElementById('autoplay')
    .addEventListener('click', onAutoPlayClick);

  document.getElementById('puzzle').addEventListener('click', moveWordToLine);

  document.getElementById('pronounce').addEventListener('click', playSentence);
  document
    .getElementById('translate')
    .addEventListener('click', onTranslateClick);
  document.getElementById('image').addEventListener('click', onImageClick);

  document.getElementById('check').addEventListener('click', checkWords);
  document
    .getElementById('idontknow')
    .addEventListener('click', onIdontknowClick);
  document
    .getElementById('continue')
    .addEventListener('click', onContinueClick);

  document
    .getElementById('results')
    .addEventListener('click', handlers.onModalOpen);

  document.getElementById('level').addEventListener('change', onLevelChange);
  document.getElementById('round').addEventListener('change', onPageChange);
};

const loadState = () => {
  PROMTS = restoreAppPromts();
  APP_STATE = restoreNextRound();

  setPromtButtons(PROMTS);
  setRoundsSelect();
};

window.onload = () => {
  loadState();
  setHandlers();
  startNewRound();
};
