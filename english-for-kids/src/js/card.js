import { createDomElement } from './worker';
import { ROTATE_ICO } from './constants';

export default class Card {
  constructor(categoryId, {word, translation, image, audioSrc}) {
    this.categoryId = categoryId;
    this.word = word;
    this.translation = translation;
    this.image = image;
    this.audioSrc = audioSrc;
  }

  getAudioSrc() {
    return this.audioSrc;
  }

  draw() {
    const cardContainer = createDomElement('div', 'card__container');
    const card = createDomElement('div', 'card');
    const cardFront = createDomElement('div', 'card__front');
    const cardBack = createDomElement('div', 'card__back');

    const image = createDomElement('img', 'card__image');
    image.src = this.image;
    image.alt = this.word;

    cardFront.append(image);

    const word = createDomElement('h2', 'card__word');
    word.innerText = this.word;

    const ico = createDomElement('img', 'card__rotate');
    ico.src = ROTATE_ICO;
    ico.alt = 'rotate.ico';

    word.append(ico);

    
    cardFront.append(word);

    const translation = createDomElement('h2', 'card__word');
    translation.innerText = this.translation;

    cardBack.append(image.cloneNode());
    cardBack.append(translation);

    card.append(cardFront);
    card.append(cardBack);

    cardContainer.append(card);
    // cardContainer.classList.add('card-uprise');
    cardContainer.dataset.word = this.word;

    return cardContainer;
  }
}

