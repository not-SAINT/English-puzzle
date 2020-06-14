import {
  LOCAL_STORAGE_KEY_PART,
  AUTOPLAY_KEY,
  DEFAULT_APP_PROMTS,
  TRANSLATE_KEY,
  BG_KEY,
  NEXT_ROUND_KEY,
  DEFAULT_ROUND,
} from './options';

export const createDomElement = (elementName = 'div', className) => {
  const newElement = document.createElement(elementName);
  if (className) {
    newElement.classList.add(className);
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

export const getRandomIndex = (length) => {
  return Math.floor(Math.random() * length);
};

export const isCyrilic = (text) => {
  return /[а-яё]/i.test(text);
};

export const saveToLocalStorage = (key, value) => {
  const serialObj = JSON.stringify(value);
  localStorage.setItem(`${LOCAL_STORAGE_KEY_PART}${key}`, serialObj);
};

export const restoreFromLocalStorage = (key) => {
  if (localStorage.getItem(`${LOCAL_STORAGE_KEY_PART}${key}`)) {
    return JSON.parse(localStorage.getItem(`${LOCAL_STORAGE_KEY_PART}${key}`));
  }
  return undefined;
};

export const restoreAppPromts = () => {
  const autoplay = restoreFromLocalStorage(AUTOPLAY_KEY);
  const translate = restoreFromLocalStorage(TRANSLATE_KEY);
  const image = restoreFromLocalStorage(BG_KEY);

  const promts = {};

  if (autoplay !== undefined) {
    promts.autoplay = autoplay;
  } else {
    promts.autoplay = DEFAULT_APP_PROMTS.autoplay;
  }

  if (translate !== undefined) {
    promts.translate = translate;
  } else {
    promts.translate = DEFAULT_APP_PROMTS.translate;
  }

  if (image !== undefined) {
    promts.image = image;
  } else {
    promts.image = DEFAULT_APP_PROMTS.image;
  }

  return promts;
};

export const restoreNextRound = () => {
  const nextRound = restoreFromLocalStorage(NEXT_ROUND_KEY);

  if (nextRound !== undefined) {
    const { level, round } = nextRound;

    return { level: +level, round: +round };
  }

  return DEFAULT_ROUND;
};
