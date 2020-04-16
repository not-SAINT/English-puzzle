import { createDomElement, playSound } from "./worker";
import VOLUME_LEVEL_DEFAULT from './constants'; 

const playError = (volume = VOLUME_LEVEL_DEFAULT) => {
  playSound('audio/error.mp3', volume);
}

const playCorrect = (volume = VOLUME_LEVEL_DEFAULT) => {
  playSound('audio/correct.mp3', volume);
}

const playStart = (volume = VOLUME_LEVEL_DEFAULT) => {
  playSound('audio/startgame.mp3', volume);
}

const playFailure = (volume = VOLUME_LEVEL_DEFAULT) => {
  playSound('audio/failure.mp3', volume);
}

const playSuccess = (volume = VOLUME_LEVEL_DEFAULT) => {
  playSound('audio/success.mp3', volume);
}

const resetStateBar = () => {
  document.querySelector('.game-state-bar').innerHTML = '';
}

const addAttempt = (result = 'fail') => {
  const bar = document.querySelector('.game-state-bar');

  const star = createDomElement('span', 'game-state-bar__answer');
  if (result === 'win') {
    star.classList.add('answer_win');
  } else {
    star.classList.add('answer_fail');
  }

  bar.prepend(star);
}

const drawWinImage = () => {
  const container = document.querySelector('.container');
  const winImage = createDomElement('span', 'win-image');
  container.append(winImage);
}

const drawFailImage = () => {
  const container = document.querySelector('.container');
  const winImage = createDomElement('span', 'fail-image');
  container.append(winImage);
}

export {
  playError, playCorrect, playStart, addAttempt, resetStateBar, playSuccess, playFailure,
  drawWinImage, drawFailImage
};