import '../css/style.css';
import '../css/style.scss';


import { CATEGORIES, allCards, CATEGORY_IDS } from './constants';
import { createDomElement, getRandomIndex, getIdFromStr } from './worker';
import Card from './card';

let CONTAINER = {};
let VOLUME_LEVEL = 1;
let CURRENT_CATEGORY = [];

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

const createCategories = () => {
  CONTAINER.innerHTML = '';

  CATEGORIES.forEach((caption) => {
    const newCard = createCategoryCard(caption);
    CONTAINER.append(newCard);
  });
}

const switchMenu = () => {
  document.querySelectorAll('.burger__line').forEach((span) => span.classList.toggle('active'));
  document.querySelector('.navigation').classList.toggle('open-menu');
}

const hideCategories = () => {
  document.querySelectorAll('.category__card').forEach((card) => card.classList.add('hide-category'));  
}

// const showCategories = () => {
//   document.querySelectorAll('.category__card').forEach((card) => card.classList.remove('hide-category'));
// }

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
}

const onBurgerClick = () => {
  switchMenu();
}

const onLinkClick = ({target}) => {
  if (target.classList.contains('navigation__link')) {
    selectActiveLink(target);

    const categoryId = getIdFromStr(target.innerText);

    if (target.innerText === 'Home') {
      // showCategories();
      createCategories();
    } else {
      // hideCategories();
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

const playTranslation = (source) => {
  const audio = new Audio();
  audio.src = source;
  audio.volume = VOLUME_LEVEL;
  audio.autoplay = true;
}

const getSoundSrc = (word) => {
  if (!CURRENT_CATEGORY) {
    return '';
  }
  const src = CURRENT_CATEGORY.find(card => card.word === word).audioSrc;

  // return 'audio/dive.mp3'
  return src;
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
    // card.addEventListener('mouseleave', onMouseLeaveCard);
  }

  // play sound
  if (wordCard && !rotateButton) {
    const word = wordCard.childNodes[0].firstElementChild.innerText;
    const soundSrc = getSoundSrc(word);
    playTranslation(soundSrc);
  }

}

const setHandlers = () => {
  document.querySelector('.burger').addEventListener('click', onBurgerClick);
  document.addEventListener('click', closeMenu);
  document.querySelector('.navigation').addEventListener('click', onLinkClick);
  document.querySelector('.container').addEventListener('click', onContainerClick);
}

window.onload = () => {
  CONTAINER = document.getElementById('container');
  VOLUME_LEVEL = 0.2;
  setHandlers();
  buildMenu();
  createCategories();
}
