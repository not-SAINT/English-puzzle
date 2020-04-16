import { createDomElement/* , playSound */ } from "./worker";
// import * as constants from './constants'; 



// const playError = (volume = constants.VOLUME_LEVEL_DEFAULT) => {
//   playSound(SOUND_WRONG_ANSWER, volume);
// }

// const playCorrect = (volume = constants.VOLUME_LEVEL_DEFAULT) => {
//   playSound(SOUND_CORRECT_ANSWER, volume);
// }

// const playStart = (volume = constants.VOLUME_LEVEL_DEFAULT) => {
//   playSound(SOUND_START_GAME, volume);
// }

// const playFailure = (volume = constants.VOLUME_LEVEL_DEFAULT) => {
//   playSound(SOUND_FAIL_GAME, volume);
// }

// const playSuccess = (volume = constants.VOLUME_LEVEL_DEFAULT) => {
//   playSound(SOUND_WIN_GAME, volume);
// }

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
  /* playError, playCorrect, playStart,  */addAttempt, resetStateBar, /* playSuccess, playFailure, */
  drawWinImage, drawFailImage
};