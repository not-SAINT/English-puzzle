import '../css/style.css';
import '../css/style.scss';

import * as con from './constants';
import { CATEGORIES, allCards, CATEGORY_IDS } from './loadcards';
import { createDomElement, getRandomIndex, getIdFromStr, playSound } from './worker';
import * as game from './game';
import Card from './card';

let CONTAINER = {};
let CURRENT_CATEGORY = [];
let APP_STATE_PLAY = false;
let APP_MAIN_PAGE = false;
let GAME_STATE = false;
let LAST_SOUND = '';
let CURRENT_CATEGORY_LEFT = '';
let GUESSED_WORD = '';
let COUNT_ERRORS = 0;

const changeAppState = () => {
  if (APP_STATE_PLAY) {
    // category
    const categotyCards = document.querySelectorAll('.category__card');
    categotyCards.forEach(card => card.classList.add('category__card_play'));

    // menu
    document.querySelector('.navigation').classList.add('navigation_play');

    // word_card
    const cardImage = document.querySelectorAll('.card__image');
    cardImage.forEach(card => card.classList.add('card__image_play'));
    const cardWords = document.querySelectorAll('.card__word');
    cardWords.forEach(card => card.classList.add('card__word_play'));
  } else {
    // category
    const categotyCards = document.querySelectorAll('.category__card');
    categotyCards.forEach(card => card.classList.remove('category__card_play'));

    // menu
    document.querySelector('.navigation').classList.remove('navigation_play');

    // word_card
    const cardImage = document.querySelectorAll('.card__image');
    cardImage.forEach(card => card.classList.remove('card__image_play'));
    const cardWords = document.querySelectorAll('.card__word');
    cardWords.forEach(card => card.classList.remove('card__word_play'));
  }
}

const removeSelected = () => {
  document.querySelectorAll('.card__container_disable').forEach(card => card.classList.remove('card__container_disable'));
}

const hideWordCards = () => {
  document.querySelectorAll('.card__container').forEach((card) => card.classList.add('hide-category'));  
}

const showWordCards = () => {
  document.querySelectorAll('.card__container').forEach((card) => card.classList.remove('hide-category'));  
}

const resetGameState = () => {
  LAST_SOUND = '';
  GUESSED_WORD = '';
  CURRENT_CATEGORY_LEFT = [...CURRENT_CATEGORY];
  COUNT_ERRORS = 0;
  removeSelected();
}

const showStartBtn = () => {
  document.querySelector('.start-btn').classList.remove('start-btn_hide');
}

const hideStartBtn = () => {
  document.querySelector('.start-btn').classList.add('start-btn_hide');
}

const toggleStartBtn = () => {
  if (APP_STATE_PLAY && !APP_MAIN_PAGE) {
    showStartBtn();
  } else {
    hideStartBtn();
  };
}

const buildMenu = () => {
  const menu = document.getElementById('menu');

  CATEGORIES.forEach((caption) => {
    const newLink = createDomElement('a', 'navigation__link');
    newLink.innerText = caption;
    menu.append(newLink);
  });
}

const getGategoryBackgroundImg = (categoryName) => {
  const categoryIndex = CATEGORIES.indexOf(categoryName);

  if (categoryIndex === -1) {
    return '';
  }

  const category = allCards[categoryIndex];
  const indexPreviewImg = getRandomIndex(category.length);

  return category[indexPreviewImg].image;
}

const createCategoryCard = (categoryName) => {
  const card = createDomElement('div', 'category__card');
  card.id = getIdFromStr(categoryName);

  const img = createDomElement('img', 'category__image');
  img.alt = categoryName;
  img.src = getGategoryBackgroundImg(categoryName);

  const name = createDomElement('h2', 'category__name');
  name.innerText = categoryName;

  card.append(img);
  card.append(name);

  return card;
}

const setCategoryHeader = (categoryName) => {
  document.querySelector('.category__header').innerText = categoryName;
}

const onStartGame = () => {
  // eslint-disable-next-line no-use-before-define
  startGame();
}

const addStartGameListener = () => {
  document.querySelector('.start-btn').addEventListener('click', onStartGame);
}

const removeStartGameListener = () => {
  document.querySelector('.start-btn').removeEventListener('click', onStartGame);
}

const onRepeatClick = () => {
  if (LAST_SOUND) {
    playSound(LAST_SOUND);
  }  
}


const transformStartBtn = () => {
  const btn = document.querySelector('.start-btn');
  if (GAME_STATE) {
    btn.classList.add('start-btn_repeat');
    btn.addEventListener('click', onRepeatClick);
    btn.innerText = '';
  } else {
    btn.classList.remove('start-btn_repeat');
    btn.removeEventListener('click', onRepeatClick);
    btn.innerText = 'START GAME';
    addStartGameListener();
  };
}

const stopGame = () => {
  GAME_STATE = false;
  game.resetStateBar();
  COUNT_ERRORS = 0;    
  transformStartBtn();
  addStartGameListener();
  resetGameState();
}

const createCategories = () => {
  CONTAINER.innerHTML = '';

  CATEGORIES.forEach((caption) => {
    const newCard = createCategoryCard(caption);
    CONTAINER.append(newCard);
  });

  APP_MAIN_PAGE = true;
  changeAppState();
  hideStartBtn();
  setCategoryHeader('');
  stopGame();
}

const switchMenu = () => {
  document.querySelectorAll('.burger__line').forEach((span) => span.classList.toggle('active'));
  document.querySelector('.navigation').classList.toggle('open-menu');
}

const hideCategories = () => {
  document.querySelectorAll('.category__card').forEach((card) => card.classList.add('hide-category'));  
}

const selectActiveLink = (target) => {
  document.querySelectorAll('.navigation__link').forEach(link => link.classList.remove('link_selected'));
  target.classList.add('link_selected');
}

const closeMenu = ({target}) => {
  const item = target.closest('div');

  if (!(item && item.classList.contains('burger'))) {
    document.querySelector('.navigation').classList.remove('open-menu');
    document.querySelectorAll('.burger__line').forEach((span) => span.classList.remove('active'));
  }  
}

const getSelectedCategoryIndex = (id) => {
  return CATEGORY_IDS.indexOf(id);
}

const findLinkById = (id) => {
  const [...links] = document.querySelectorAll('.navigation__link');
  return links.find(link => getIdFromStr(link.innerText) === id);
}

const createSelectedCategory = (id) => {
  const categoryIndex = getSelectedCategoryIndex(id);
  const selectedCategory = allCards[categoryIndex];

  CONTAINER.innerHTML = '';
  selectedCategory.forEach(word => {
    const card = new Card(id, word);
    CONTAINER.append(card.draw());
  });

  CURRENT_CATEGORY = selectedCategory;
  const selectedLink = findLinkById(id);
  selectActiveLink(selectedLink);
  setCategoryHeader(CATEGORIES[categoryIndex]);

  APP_MAIN_PAGE = false;
  changeAppState();
  toggleStartBtn();
  stopGame();
}

const onBurgerClick = () => {
  switchMenu();
}

const onLinkClick = ({target}) => {
  if (target.classList.contains('navigation__link')) {
    selectActiveLink(target);

    const categoryId = getIdFromStr(target.innerText);

    if (target.innerText === 'Home') {
      createCategories();
    } else {
      createSelectedCategory(categoryId);
    }    
  }
}

const onMouseLeaveCard = ({target}) => {
  const card = target.closest('.card');

  if (card.classList.contains('is-flipped')) {
    card.classList.toggle('is-flipped');
    card.classList.toggle('no-hover');
    card.removeEventListener('mouseleave', onMouseLeaveCard);
  }  
}

const flipCard = (card) => {
  card.classList.toggle('is-flipped');
  card.classList.toggle('no-hover');
}

const getSoundSrc = (word) => {
  if (!CURRENT_CATEGORY) {
    return '';
  }
  const src = CURRENT_CATEGORY.find(card => card.word === word).audioSrc;

  // return 'audio/dive.mp3'
  return src;
}

const gameOver = () => {
  if (COUNT_ERRORS === 0) {
    playSound(con.SOUND_WIN_GAME);
  } else {
    playSound(con.SOUND_FAIL_GAME);
  }

  hideWordCards();
  hideStartBtn();

  setTimeout(() => { CONTAINER.innerHTML = ''; }, 1000);

  setTimeout(() => {
    if (COUNT_ERRORS === 0) {
      game.drawWinImage();
    } else {
      game.drawFailImage();
    }
    
    stopGame();
  }, 1500);

  setTimeout(createCategories, 4500);
}

const getRandomSoundFromSelectedCategory = () => {
  
  const wordsLeft = CURRENT_CATEGORY_LEFT.length;

  if (wordsLeft > 0) {
    const randomIndex = getRandomIndex(CURRENT_CATEGORY_LEFT.length);
    const selectedCard = CURRENT_CATEGORY_LEFT.splice(randomIndex, 1);
    LAST_SOUND = selectedCard[0].audioSrc;
    GUESSED_WORD = selectedCard[0].word;
  } else {
    LAST_SOUND = '';
    gameOver ();
  }

  return LAST_SOUND;
}

const playRandomSound = () => {
   const randomSoundSrc = getRandomSoundFromSelectedCategory();
    if (randomSoundSrc) {
      playSound(randomSoundSrc);
    } 
}

const setGuessedCard = (wordCard) => {
  wordCard.classList.add('card__container_disable');
}

const tryGuess = (wordCard) => {
  const {word} = wordCard.dataset;
  if (word === GUESSED_WORD) {
    playSound(con.SOUND_CORRECT_ANSWER);
    game.addAttempt('win');
    setTimeout(playRandomSound, 1000);
    setGuessedCard(wordCard);
  } else {
    playSound(con.SOUND_WRONG_ANSWER);
    game.addAttempt('fail');
    COUNT_ERRORS += 1;
  }  
}

const onContainerClick = ({target}) => {
  const categoryCard = target.closest('.category__card');
  const wordCard = target.closest('.card__container');
  const id = (categoryCard && categoryCard.id) ? categoryCard.id : null ;
  const card = target.closest('.card');
  
  // if container => exit
  if (id === 'container') {
    return;
  }

  // pick category
  if (id) {
    hideCategories(); 
    setTimeout(createSelectedCategory, 200, id);
  }
  
  // rotate card
  const rotateButton = target.closest('.card__rotate');
  if (rotateButton) {
    flipCard(card);
    setTimeout(() => card.addEventListener('mouseleave', onMouseLeaveCard), 100);
  }

  // play sound
  if (wordCard && !rotateButton) {
    const word = wordCard.childNodes[0].firstElementChild.innerText;
    if (word) {
      const soundSrc = getSoundSrc(word);
      playSound(soundSrc);
    }   
  }

  if(GAME_STATE && wordCard) {
    if (!wordCard.classList.contains('card__container_disable')) {
      tryGuess(wordCard);
    }    
  }
}

const onToggleClick = ({target}) => {
  APP_STATE_PLAY = target.checked;
  changeAppState();
  toggleStartBtn();
  transformStartBtn();
  stopGame();
}

const startGame = () => {
  GAME_STATE = true;
  resetGameState();
  showWordCards();
  // change btn
  removeStartGameListener();
  transformStartBtn();

  playSound(con.SOUND_START_GAME);

  setTimeout(() => {
    playRandomSound();
  }, 3000);  
}

const setHandlers = () => {
  document.querySelector('.burger').addEventListener('click', onBurgerClick);
  document.addEventListener('click', closeMenu);
  document.querySelector('.navigation').addEventListener('click', onLinkClick);
  document.querySelector('.container').addEventListener('click', onContainerClick);
  document.querySelector('.toggle-checkbox').addEventListener('click', onToggleClick);
  addStartGameListener();
}

window.onload = () => {
  CONTAINER = document.getElementById('container');
  setHandlers();
  buildMenu();
  createCategories();
}
