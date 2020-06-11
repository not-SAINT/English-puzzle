import { START_POS_WORDS, CARD_MARGIN } from './options';
import * as UTILS from './utils';

export const createDomElement = (elementName = 'div', ...classNames) => {
  const newElement = document.createElement(elementName);
  if (classNames) {
    newElement.classList.add(...classNames);
  }

  return newElement;
};

export const addClassToElement = (selector, className) => {
  document.querySelector(selector).classList.add(className);
  return true;
};

export const removeClassToElement = (selector, className) => {
  document.querySelector(selector).classList.remove(className);
  return false;
};

export const createWordCards = (words) => {
  const root = document.getElementById('puzzle');

  const shuffledWords = UTILS.shuffleArray(words);
  const symbolSize = UTILS.getSymbolSize(words);

  let startHorizCoord = 0;

  shuffledWords.forEach((word, index) => {
    const wordCard = createDomElement(
      'span',
      'word-card',
      'word-card__moveable'
    );
    const cardWidth = symbolSize * word.length - CARD_MARGIN;
    wordCard.innerText = word;
    wordCard.style.width = `${cardWidth}px`;
    wordCard.style.top = `${START_POS_WORDS}px`;
    wordCard.style.left = `${startHorizCoord}px`;
    wordCard.dataset.startIndex = index;
    wordCard.dataset.startHorizCoord = startHorizCoord;
    wordCard.dataset.width = cardWidth;

    startHorizCoord += cardWidth + CARD_MARGIN;

    root.append(wordCard);
  });
};

export const clearWordsField = () => {
  document.getElementById('words').innerHTML = '';
};

export const generateNewLinePuzzle = () => {
  const field = document.getElementById('puzzle');
  const newLine = createDomElement('div', 'puzzle-line');
  newLine.style.height = `${UTILS.getPuzzleLineHeigth()}px`;

  field.append(newLine);
};

export const getCurrentLineWords = () => {
  const words = [];

  document
    .querySelectorAll('.word-card__preview')
    .forEach((card) => words.push(card.innerText));

  return words;
};

export const resetCheckedClasses = () => {
  document
    .querySelectorAll('.word-card')
    .forEach((card) =>
      card.classList.remove('word-card__right', 'word-card__wrong')
    );
};

export const setCorrectWordCardPosition = (correctWords) => {
  let isSentenceDone = true;
  const wordsForCheck = document.querySelectorAll('.word-card__preview');
  const cntWordsToCheck = wordsForCheck.length;

  if (cntWordsToCheck < correctWords.length) {
    isSentenceDone = false;
  }

  const currCards = Array.from(wordsForCheck).map((card) => {
    return { word: card.innerText, left: parseInt(card.style.left, 10) };
  });

  currCards.sort(UTILS.compareByLeft);
  // currCards.forEach((t) => console.log(t));
  resetCheckedClasses();

  wordsForCheck.forEach((card) => {
    const index = correctWords.indexOf(card.innerText);
    if (index >= 0) {
      if (
        index < cntWordsToCheck &&
        correctWords[index] === currCards[index].word
      ) {
        card.classList.add('word-card__right');
        // console.log('true');
      } else {
        card.classList.add('word-card__wrong');
        isSentenceDone = false;
        // console.log('faalse');
      }
    }

    // console.log(
    //   `word = '${currCards[index].word}' correctWords = '${correctWords[index]}'`
    // );
  });

  return isSentenceDone;
};

export const pushBackLastCards = (emptyPos, leftShift) => {
  // let newLeft = left;

  // document.querySelectorAll('.word-card__preview').forEach((card) => {
  //   const wordCard = card;
  //   const cardLeft = parseInt(wordCard.style.left, 10);

  //   if (cardLeft > newLeft) {
  //     wordCard.style.left = `${newLeft + CARD_MARGIN}px`;
  //     newLeft += wordCard.dataset.width;
  //   }
  // });

  document.querySelectorAll('.word-card__preview').forEach((card) => {
    const wordCard = card;
    const cardLeft = parseInt(wordCard.style.left, 10);

    if (cardLeft > emptyPos) {
      wordCard.style.left = `${cardLeft - leftShift - CARD_MARGIN}px`;
      // newLeft += wordCard.dataset.width;
    }
  });

  // return newLeft;
};

export const setAutoPlayButton = (autoplay) => {
  const btn = document.getElementById('autoplay');
  if (autoplay) {
    btn.classList.add('tooltip__btn_selected');
  } else {
    btn.classList.remove('tooltip__btn_selected');
  }
};
