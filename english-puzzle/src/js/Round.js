import {
  PUZZLE_FILED_HEIGHT,
  ROUND_SIZE,
  CARD_MARGIN,
  START_POS_WORDS,
  VOICE_URL,
  PICTURE_URL,
} from './options';
import {
  getWords,
  playSound,
  calcLineHeight,
  preloadImage,
  getBackgroundInfo,
} from './utils';

import * as myDom from './workWithDom';
import { getBackgroundPictureObject } from './levels';

export default class Round {
  constructor({ level, round }, data, prompts) {
    this.data = data;
    this.promts = prompts;

    this.level = level;
    this.round = round;
    this.currentStep = 0;
    this.currentStepNextCardPos = 0;
    this.currentStepTop = 0;

    // this.rightPos = 0;
    this.puzzle = document.getElementById('puzzle');

    // this.lineHeight = PUZZLE_FILED_HEIGHT / ROUND_SIZE;
    this.lineHeight = calcLineHeight();

    this.currentSentence = '';
    this.currentStepComplete = false;
    this.currentSentenceSound = '';
    this.currentSentenceTranslate = '';
    this.pictureObjectInfo = getBackgroundPictureObject(level, round);
    this.currentBackground = '';
    // this.currentBackgroundInfo = `ds ghfd sd jfgsdhfg sdjkf gh`;
    // this.buttonsState = {};
  }

  async loadBackgroundPicture() {
    const { cutSrc } = this.pictureObjectInfo;
    const pictureUrl = `${PICTURE_URL}${cutSrc}`;

    this.currentBackground = pictureUrl;

    await preloadImage(pictureUrl);
    // return pictureUrl;
  }

  async loadCurrSentence() {
    const { text, audio, translate } = this.data[this.currentStep];
    const words = getWords(text);

    await this.loadBackgroundPicture();

    myDom.clearWordsField();
    // myDom.generateNewLinePuzzle();
    // console.log(`this.currentBackground = ${this.currentBackground}`);

    myDom.createWordCards(words, this.currentBackground, this.currentStepTop);

    this.currentSentence = words;
    this.currentSentenceSound = audio;
    this.currentSentenceTranslate = translate;
    this.currentStepTop = this.currentStep * this.lineHeight;

    this.showPromts();

    // this.buttonsState.idontknow = true;
    // this.buttonsState.check = true;

    // myDom.setGameButtons(this.buttonsState);
    myDom.toggleGameButton('idontknow', true);
    myDom.toggleGameButton('check', true);
    myDom.toggleGameButton('continue', false);
    myDom.toggleGameButton('results', false);
  }

  moveWord(wordCard) {
    let card = wordCard;
    const cardWidth = parseInt(wordCard.dataset.width, 10);

    myDom.resetCheckedClasses();

    // card.style.top = `${this.currentStepTop}px`;
    // card.style.left = `${this.currentStepNextCardPos}px`;

    card = myDom.moveCardTo(
      card,
      this.currentStepTop,
      this.currentStepNextCardPos
    );

    card.classList.add('word-card__preview');

    this.currentStepNextCardPos += cardWidth + CARD_MARGIN;
  }

  resetPosition(wordCard) {
    let card = wordCard;
    const { startHorizCoord } = wordCard.dataset;
    const cardWidth = parseInt(wordCard.dataset.width, 10);
    const cardLeft = parseInt(wordCard.style.left, 10);

    myDom.resetCheckedClasses();

    // card.style.top = `${START_POS_WORDS}px`;
    // card.style.left = `${startHorizCoord}px`;

    card = myDom.moveCardTo(card, START_POS_WORDS, startHorizCoord);

    this.currentStepNextCardPos -= cardWidth + CARD_MARGIN;

    card.classList.remove('word-card__preview');
    card.classList.remove('word-card__wrong');
    card.classList.remove('word-card__right');

    // this.currentStepNextCardPos = myDom.pushBackLastCards(
    //   this.currentStepNextCardPos
    // );

    myDom.pushBackLastCards(cardLeft, cardWidth);

    // wordCard.style.top = `${START_POS_WORDS}px`;
    // wordCard.style.left = `${startHorizCoord}px`;
    // wordCard.dataset.startIndex = index;
    // wordCard.dataset.startHorizCoord = startHorizCoord;
  }

  checkCurrentWordsPosition() {
    this.currentStepComplete = myDom.setCorrectWordCardPosition(
      this.currentSentence
    );

    // console.log(`this.currentStepComplete = ${this.currentStepComplete}`);

    return this.currentStepComplete;
  }

  resetStepVars() {
    this.currentStepNextCardPos = 0;
  }

  nextStep() {
    this.currentStep += 1;
    this.resetStepVars();

    myDom.resetCheckedClasses();
    myDom.clearTranslate();
    // на всякий случай, удалить все оставшиеся слова в ожидании
    myDom.clearUnusedWords();
    myDom.saveCardsPosition();

    if (this.currentStep < ROUND_SIZE) {
      this.loadCurrSentence();
      myDom.toggleGameButton('continue', false);
    }
  }

  setRestWords() {
    this.checkCurrentWordsPosition();

    if (!this.currentStepComplete) {
      myDom.showCardsImage(this.currentBackground);
      myDom.setWords(this.currentSentence, this.currentStepTop);
    }

    myDom.switchButtonsToNextStep();
  }

  showPromts(isChosen = true) {
    // autoplay
    if (isChosen && this.promts.autoplay) {
      const url = `${VOICE_URL}${this.currentSentenceSound}`;
      playSound(url);
    }

    // translate
    if (isChosen && this.promts.translate) {
      myDom.showTranslate(this.currentSentenceTranslate);
    } else {
      myDom.clearTranslate();
    }

    console.log(`showPromts ${this.promts.image} ${this.currentBackground}`);
    console.log(`showPromts ${isChosen} `);

    // background
    if (isChosen && this.promts.image) {
      myDom.toggleCardsImage(this.currentBackground);
    } else {
      myDom.toggleCardsImage();
    }
  }

  endRound() {
    this.currentStep += 1;

    // скрыть карточки
    myDom.hideWordCards();
    // показать данные о картине
    myDom.toggleGameButton('results', true);
    // показать инфу о картинке
    const currentBackgroundInfo = getBackgroundInfo(this.pictureObjectInfo);
    myDom.showTranslate(currentBackgroundInfo);
  }
}
