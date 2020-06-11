import {
  PUZZLE_FILED_HEIGHT,
  ROUND_SIZE,
  CARD_MARGIN,
  START_POS_WORDS,
  VOICE_URL,
} from './options';
import { getWords, playSound } from './utils';

import * as myDom from './workWithDom';

export default class Round {
  constructor(data, prompts) {
    this.data = data;
    this.promts = prompts;

    this.currentStep = 0;
    this.currentStepNextCardPos = 0;
    this.currentStepTop = 0;

    // this.rightPos = 0;
    this.puzzle = document.getElementById('puzzle');

    this.lineHeight = PUZZLE_FILED_HEIGHT / ROUND_SIZE;

    this.currentSentence = '';
    this.currentStepComplete = false;
    this.currentSentenceSound = '';
    this.currentSentenceTranslate = '';
  }

  // setStartRoundValues() {
  //   this.puzzle = document.getElementById('puzzle');

  //   this.lineHeight = PUZZLE_FILED_HEIGHT / ROUND_SIZE;
  // }

  loadCurrSentence() {
    const { text, audio, translate } = this.data[this.currentStep];
    const words = getWords(text);

    myDom.clearWordsField();
    // myDom.generateNewLinePuzzle();
    myDom.createWordCards(words);

    this.currentSentence = words;
    this.currentSentenceSound = audio;
    this.currentSentenceTranslate = translate;
    this.currentStepTop = this.currentStep * this.lineHeight;

    this.showPromts();
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
    }
  }

  setRestWords() {
    this.checkCurrentWordsPosition();

    if (!this.currentStepComplete) {
      myDom.setWords(this.currentSentence, this.currentStepTop);
    }
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
    }

    // background
  }
}
