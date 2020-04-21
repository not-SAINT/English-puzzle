import { createDomElement } from "./worker";

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
  addAttempt, resetStateBar, drawWinImage, drawFailImage
};