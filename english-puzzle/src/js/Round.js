import {
  PUZZLE_FILED_HEIGHT,
  ROUND_SIZE,
  CARD_MARGIN,
  START_POS_WORDS,
} from './options';
import { getWords } from './utils';

// import {
//   createWordCards,
//   clearWordsField,
//   generateNewLinePuzzle,
//   getCurrentLineWords,
//   pushBackLastCards,
//   setCorrectWordCardPosition,
// } from './workWithDom';
import * as myDom from './workWithDom';

export default class Round {
  constructor(data) {
    this.data = data;
    this.currentStep = 0;
    this.currentStepNextCardPos = 0;
    this.currentStepTop = 0;

    // this.rightPos = 0;
    this.puzzle = document.getElementById('puzzle');

    this.lineHeight = PUZZLE_FILED_HEIGHT / ROUND_SIZE;

    this.currentSentence = '';
    this.currentStepComplete = false;
    this.currentSentenceSound = '';
  }

  // setStartRoundValues() {
  //   this.puzzle = document.getElementById('puzzle');

  //   this.lineHeight = PUZZLE_FILED_HEIGHT / ROUND_SIZE;
  // }

  loadCurrSentence() {
    const { text, audio } = this.data[this.currentStep];
    const words = getWords(text);

    myDom.clearWordsField();
    myDom.generateNewLinePuzzle();
    myDom.createWordCards(words);

    this.currentSentence = words;
    this.currentSentenceSound = audio;
  }

  moveWord(wordCard) {
    const card = wordCard;
    const cardWidth = parseInt(wordCard.dataset.width, 10);

    this.currentStepTop = this.currentStep * this.lineHeight;

    myDom.resetCheckedClasses();

    card.style.top = `${this.currentStepTop}px`;
    card.style.left = `${this.currentStepNextCardPos}px`;

    card.classList.add('word-card__preview');

    this.currentStepNextCardPos += cardWidth + CARD_MARGIN;

    // const clone = wordCard.cloneNode(true);
    // clone.style.boxSizing = 'border-box';
    // console.log(clone.style.width);

    // this.puzzle
    //   .querySelector(`:nth-child(${this.currentStep + 1})`)
    //   .append(clone);

    // const w = parseInt(clone.style.width, 10);
    // clone.style.width = `${w - 3}px`;
  }

  resetPosition(wordCard) {
    const card = wordCard;
    const { startHorizCoord } = wordCard.dataset;
    const cardWidth = parseInt(wordCard.dataset.width, 10);
    const cardLeft = parseInt(wordCard.style.left, 10);

    myDom.resetCheckedClasses();

    card.style.top = `${START_POS_WORDS}px`;
    card.style.left = `${startHorizCoord}px`;

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

  nextStep() {
    this.currentStep += 1;

    if (this.currentStep < ROUND_SIZE) {
      this.resetStep();
      this.loadCurrSentence();
    }
  }
}
