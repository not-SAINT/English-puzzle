import {
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
    this.currentStepComplete = false;
    this.isSentenceVoiced = false;
    this.roundResults = {
      idontknow: [],
      iknow: [],
    };

    this.puzzle = document.getElementById('puzzle');
    this.lineHeight = calcLineHeight();
    this.pictureObjectInfo = getBackgroundPictureObject(level, round);

    this.currentWords = '';
    this.currentSentence = '';
    this.currentSentenceSound = '';
    this.currentSentenceTranslate = '';
    this.currentBackground = '';
  }

  async loadBackgroundPicture() {
    const { cutSrc } = this.pictureObjectInfo;
    const pictureUrl = `${PICTURE_URL}${cutSrc}`;

    this.currentBackground = pictureUrl;

    await preloadImage(pictureUrl);
  }

  async loadCurrSentence() {
    const { text, audio, translate } = this.data[this.currentStep];
    const words = getWords(text);

    await this.loadBackgroundPicture();

    myDom.clearWordsField();
    myDom.createWordCards(words, this.currentBackground, this.currentStepTop);

    this.currentWords = words;
    this.currentSentence = text;
    this.currentSentenceSound = audio;
    this.currentSentenceTranslate = translate;
    this.currentStepTop = this.currentStep * this.lineHeight;

    this.showPromts();

    myDom.toggleGameButton('idontknow', true);
    myDom.toggleGameButton('check', true);
    myDom.toggleGameButton('continue', false);
    myDom.toggleGameButton('results', false);
  }

  moveWord(wordCard) {
    let card = wordCard;
    const cardWidth = parseInt(wordCard.dataset.width, 10);

    myDom.resetCheckedClasses();

    card = myDom.moveCardTo(
      card,
      this.currentStepTop,
      this.currentStepNextCardPos
    );

    card.classList.add('word-card__preview');

    this.currentStepNextCardPos += cardWidth + CARD_MARGIN;
  }

  addResults(group) {
    const { idontknow, iknow } = this.roundResults;
    const sentence = this.currentSentence;

    if (group === 'idontknow') {
      idontknow.push(sentence);
    }

    if (group === 'iknow') {
      iknow.push(sentence);
    }
  }

  resetPosition(wordCard) {
    let card = wordCard;
    const { startHorizCoord } = wordCard.dataset;
    const cardWidth = parseInt(wordCard.dataset.width, 10);
    const cardLeft = parseInt(wordCard.style.left, 10);

    myDom.resetCheckedClasses();

    card = myDom.moveCardTo(card, START_POS_WORDS, startHorizCoord);

    this.currentStepNextCardPos -= cardWidth + CARD_MARGIN;

    card.classList.remove('word-card__preview');
    card.classList.remove('word-card__wrong');
    card.classList.remove('word-card__right');

    myDom.pushBackLastCards(cardLeft, cardWidth);
  }

  checkCurrentWordsPosition() {
    this.currentStepComplete = myDom.setCorrectWordCardPosition(
      this.currentWords
    );

    return this.currentStepComplete;
  }

  resetStepVars() {
    this.currentStepNextCardPos = 0;
    this.isSentenceVoiced = false;
  }

  nextStep() {
    this.currentStep += 1;
    this.resetStepVars();

    myDom.resetCheckedClasses();
    myDom.clearTranslate();
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
      myDom.toggleCardsImage(this.currentBackground);
      myDom.setWords(this.currentWords, this.currentStepTop);

      this.addResults('idontknow');
    } else {
      this.addResults('iknow');
    }

    myDom.switchButtonsToNextStep();
  }

  showPromts() {
    if (this.promts.autoplay && !this.isSentenceVoiced) {
      const url = `${VOICE_URL}${this.currentSentenceSound}`;

      this.isSentenceVoiced = true;

      playSound(url);
    }

    if (this.promts.translate) {
      myDom.showTranslate(this.currentSentenceTranslate);
    } else {
      myDom.clearTranslate();
    }

    if (this.promts.image) {
      myDom.toggleCardsImage(this.currentBackground);
    } else {
      myDom.toggleCardsImage();
    }
  }

  showRestPromts() {
    if (!this.promts.autoplay) {
      const url = `${VOICE_URL}${this.currentSentenceSound}`;

      playSound(url);
    }

    if (!this.promts.translate) {
      myDom.showTranslate(this.currentSentenceTranslate);
    }

    if (!this.promts.image) {
      myDom.toggleCardsImage(this.currentBackground);
    }
  }

  endRound() {
    this.currentStep += 1;

    this.roundResults = {
      idontknow: [],
      iknow: [],
    };

    myDom.hideWordCards();
    myDom.toggleGameButton('results', true);

    const currentBackgroundInfo = getBackgroundInfo(this.pictureObjectInfo);

    myDom.showTranslate(currentBackgroundInfo);
  }
}
