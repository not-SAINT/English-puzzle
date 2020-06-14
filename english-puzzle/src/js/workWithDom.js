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

export const setBGforWordCard = (wordCard, imageUrl, positionX, positionY) => {
  const card = wordCard;

  card.style.backgroundImage = `url('${imageUrl}')`;
  card.style.backgroundPosition = `top ${positionY}px left ${positionX}px`;

  return card;
};

export const createWordCards = (words, imageUrl, imageTop) => {
  const root = document.getElementById('puzzle');
  const shuffledWords = UTILS.shuffleArray(words);
  const symbolSize = UTILS.getSymbolSize(words);
  const correctWords = words.slice();
  const leftCoods = UTILS.getCorrestLeftCoords(words);

  let startHorizCoord = 0;

  shuffledWords.forEach((word, index) => {
    let wordCard = createDomElement('span', 'word-card', 'word-card__moveable');
    const cardWidth = symbolSize * word.length - CARD_MARGIN;
    wordCard.innerText = word;
    wordCard.style.width = `${cardWidth}px`;
    wordCard.style.top = `${START_POS_WORDS}px`;
    wordCard.style.left = `${startHorizCoord}px`;
    wordCard.dataset.startIndex = index;
    wordCard.dataset.startHorizCoord = startHorizCoord;
    wordCard.dataset.width = cardWidth;

    const indexLeft = correctWords.indexOf(word);

    if (indexLeft >= 0) {
      correctWords[indexLeft] = '';
      wordCard = setBGforWordCard(
        wordCard,
        imageUrl,
        -leftCoods[indexLeft],
        -imageTop
      );
    }

    startHorizCoord += cardWidth + CARD_MARGIN;

    root.append(wordCard);
  });
};

export const clearWordsField = () => {
  document.getElementById('words').innerHTML = '';
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

export const setPromtButtons = (promts) => {
  const keys = Object.keys(promts);

  keys.forEach((key) => {
    const btn = document.getElementById(key);
    if (promts[key]) {
      btn.classList.add('tooltip__btn_selected');
    } else {
      btn.classList.remove('tooltip__btn_selected');
    }
  });
};

export const clearUnusedWords = () => {
  document.querySelectorAll('.word-card__moveable').forEach((card) => {
    if (
      !card.classList.contains('word-card__preview') &&
      !card.classList.contains('word-card__mounted')
    ) {
      card.remove();
    }
  });
};

export const saveCardsPosition = () => {
  document.querySelectorAll('.word-card__moveable').forEach((card) => {
    card.classList.remove('word-card__moveable');
    card.classList.remove('word-card__preview');
    card.classList.add('word-card__mounted');
  });
};

export const moveCardTo = (card, top, left) => {
  const element = card;
  let elementTop = top;
  let elementLeft = left;

  if (`${top}`.includes('px')) {
    elementTop = elementTop.slice(0, -2);
  }

  if (`${left}`.includes('px')) {
    elementLeft = elementLeft.slice(0, -2);
  }

  element.style.top = `${elementTop}px`;
  element.style.left = `${elementLeft}px`;

  return element;
};

export const setWords = (correctWords, top) => {
  const words = correctWords;
  const wordCards = document.querySelectorAll('.word-card__moveable');
  // const wordCards = document.

  // const symbolSize = UTILS.getSymbolSize(correctWords);
  // let startHorizCoord = 0;

  // const leftCoods = correctWords.map((word) => {
  //   const res = startHorizCoord;
  //   const cardWidth = symbolSize * word.length - CARD_MARGIN;
  //   startHorizCoord += cardWidth + CARD_MARGIN;
  //   return res;
  // });

  const leftCoods = UTILS.getCorrestLeftCoords(correctWords);

  // const leftCoods = [];
  // wordCards.forEach((card) => {
  //   leftCoods.push(parseInt(card.style.left, 10));
  // });
  // leftCoods.sort(UTILS.compareSimple);

  // leftCoods.forEach((t) => console.log(t));

  // wordCards.forEach((card) => {
  //   const word = card.innerText;
  //   const index = correctWords.indexOf(word);

  //   moveCardTo(card, top, leftCoods[index]);
  //   card.classList.add('word-card__mounted');
  //   card.classList.remove('word-card__moveable');
  //   card.classList.remove('word-card__preview');
  // });

  for (let i = 0; i < wordCards.length; i += 1) {
    const card = wordCards[i];
    // const element = arr/ay[i];
    const word = card.innerText;
    const index = words.indexOf(word);

    if (index >= 0) {
      words[index] = '';
      moveCardTo(card, top, leftCoods[index]);
      card.classList.add('word-card__mounted');
      card.classList.remove('word-card__moveable');
      card.classList.remove('word-card__preview');
    }
  }
};

export const showTranslate = (text) => {
  document.querySelector('.translate-field__text').innerText = text;
};

export const clearTranslate = () => {
  document.querySelector('.translate-field__text').innerText = '';
};

// export const setGameButtons = (buttonsState) => {
//   const keys = Object.keys(buttonsState);

//   keys.forEach((key) => {
//     const btn = document.getElementById(key);
//     if (buttonsState[key]) {
//       btn.classList.remove('control__btn_hide');
//     } else {
//       btn.classList.add('control__btn_hide');
//     }
//   });
// };

export const toggleGameButton = (buttonId, isVisible = false) => {
  const btn = document.getElementById(buttonId);
  if (isVisible) {
    btn.classList.remove('control__btn_hide');
  } else {
    btn.classList.add('control__btn_hide');
  }
};

export const setPuzzleBackgroundImage = (imageUrl) => {
  document.getElementById('puzzle').style.backgroundImage = imageUrl;
};

export const hideWordCards = () => {
  const wordCards = document.querySelectorAll('.word-card');

  wordCards.forEach((card) => {
    card.classList.add('word-card__hide');
  });
};

// export const hideCardsImage = () => {
//   const wordCards = document.querySelectorAll('.word-card__moveable');

//   wordCards.forEach((card) => {
//     const wordCard = card;
//     wordCard.style.backgroundImage = '';
//   });
// };

// export const showCardsImage = (imageUrl) => {
//   const wordCards = document.querySelectorAll('.word-card__moveable');

//   wordCards.forEach((card) => {
//     const wordCard = card;
//     wordCard.style.backgroundImage = imageUrl;
//   });
// };

export const toggleCardsImage = (imageUrl) => {
  const wordCards = document.querySelectorAll('.word-card__moveable');

  wordCards.forEach((card) => {
    const wordCard = card;
    wordCard.style.backgroundImage = imageUrl ? `url('${imageUrl}')` : '';
  });
};

export const createSelectOptions = (cntRounds) => {
  const select = document.getElementById('round');

  select.innerHTML = '';

  for (let i = 1; i <= cntRounds; i += 1) {
    const opt = document.createElement('option');
    opt.value = i - 1;
    opt.text = i;
    opt.innerHTML = i;
    select.appendChild(opt);
  }
};

export const resetPuzzleField = () => {
  const field = document.getElementById('puzzle');

  field.innerHTML = '';
  field.style.backgroundImage = '';
};

export const setSelectWithAppState = ({ level, round }) => {
  const selectLevel = document.getElementById('level');
  const selectRound = document.getElementById('round');

  selectLevel.selectedIndex = level;
  selectRound.selectedIndex = round;
};

export const isAllWordsSetted = (cntWords) => {
  const cntWordSetted = document.querySelectorAll('.word-card__preview').length;

  return cntWordSetted === cntWords;
};

export const switchButtonsToNextStep = () => {
  toggleGameButton('idontknow', false);
  toggleGameButton('check', false);
  toggleGameButton('continue', true);
};
