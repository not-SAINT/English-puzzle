import '../css/style.css';
import '../css/style.scss';


import { CATEGORIES, allCards } from './constants';
import { createDomElement, getRandomIndex, getIdFromStr } from './worker';
// import cards from './cards';

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
  const container = document.getElementById('container');
  // container.innerHTML = '';

  CATEGORIES.forEach((caption) => {
    const newCard = createCategoryCard(caption);
    container.append(newCard);
  });
}

const switchMenu = () => {
  document.querySelectorAll('.burger__line').forEach((span) => span.classList.toggle('active'));
  document.querySelector('.navigation').classList.toggle('open-menu');
}

const hideCategories = () => {
  document.querySelectorAll('.category__card').forEach((card) => card.classList.add('hide-category'));
}

const showCategories = () => {
  document.querySelectorAll('.category__card').forEach((card) => card.classList.remove('hide-category'));
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

const createSelectedCategory = (id) => {

}

const onBurgerClick = () => {
  switchMenu();
}

const onLinkClick = ({target}) => {
  if (target.classList.contains('navigation__link')) {
    selectActiveLink(target);

    if (target.innerText === 'Home') {
      showCategories();
    } else {
      hideCategories();
    }    
  }
}

const onContainerClick = ({target: {id}}) => {
  if (id === 'container') {
    return;
  }
  if (id) {
    hideCategories(); 
    createSelectedCategory(id);  
  }  
}


const setHandlers = () => {
  document.querySelector('.burger').addEventListener('click', onBurgerClick);
  document.addEventListener('click', closeMenu);
  document.querySelector('.navigation').addEventListener('click', onLinkClick);
  document.querySelector('.container').addEventListener('click', onContainerClick);
}

window.onload = () => {
  setHandlers();
  buildMenu();
  createCategories();
}
