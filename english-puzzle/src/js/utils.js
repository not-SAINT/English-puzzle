import {
  GAME_FILED_WIDTH,
  GAME_FILED_HEIGHT,
  ROUND_SIZE,
  VOLUME_LEVEL_DEFAULT,
  CARD_MARGIN,
  PUZZLE_FILED_HEIGHT,
} from './options';
import { restoreFromLocalStorage } from './worker';

export const filterDataFromBackend = (data) => {
  return data.map((word) => {
    const {
      id,
      group: level,
      page,
      textExample,
      textExampleTranslate: translate,
      audioExample: audio,
    } = word;

    const text = textExample.replace(/<.?b>/g, '');

    return {
      id,
      level,
      page,
      text,
      translate,
      audio,
    };
  });
};

export const getWords = (sentence) => sentence.split(' ');

export const getSymbolSize = (words) => {
  const countCharacters = words.join('').length;
  return GAME_FILED_WIDTH / countCharacters;
};

export const getPuzzleLineHeigth = () => {
  return GAME_FILED_HEIGHT / ROUND_SIZE;
};

// {
//   "id": "5e9f5ee35eb9e72bc21af4e5",
//   "group": 0,
//   "page": 3,
//   "word": "instruct",
//   "image": "files/04_0070.jpg",
//   "audio": "files/04_0070.mp3",
//   "audioMeaning": "files/04_0070_meaning.mp3",
//   "audioExample": "files/04_0070_example.mp3",
//   "textMeaning": "To <i>instruct</i> is to teach.",
//   "textExample": "My teacher <b>instructs</b> us in several subjects.",
//   "transcription": "[instrʌ́kt]",
//   "textExampleTranslate": "Мой учитель учит нас нескольким предметам",
//   "textMeaningTranslate": "Обучать - значит учить",
//   "wordTranslate": "инструктирует",
//   "wordsPerExampleSentence": 7
// }

export const shuffleArray = (arr) => {
  const res = arr.slice();

  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [res[i], res[j]] = [res[j], res[i]];
  }

  return res;
};

export const compareByLeft = (a, b) => {
  if (a.left < b.left) {
    return -1;
  }
  if (a.left > b.left) {
    return 1;
  }

  return 0;
};

// export const compareSimple = (a, b) => {
//   if (a < b) {
//     return -1;
//   }
//   if (a > b) {
//     return 1;
//   }

//   return 0;
// };

export const playSound = (source, volume = VOLUME_LEVEL_DEFAULT) => {
  if (source) {
    const audio = new Audio();
    audio.src = source;
    audio.volume = volume;
    audio.autoplay = true;
  }
};

export const getCorrestLeftCoords = (words) => {
  const symbolSize = getSymbolSize(words);
  let startLeft = 0;

  return words.map((word) => {
    const res = startLeft;
    const cardWidth = symbolSize * word.length - CARD_MARGIN;
    startLeft += cardWidth + CARD_MARGIN;
    return res;
  });
};

export const calcLineHeight = () => {
  return (GAME_FILED_HEIGHT * 0.76 - 30) / ROUND_SIZE;
};

export const preloadImage = (imageUrl) => {
  return new Promise((resolve, reject) => {
    const image = document.createElement('img');
    image.onload = resolve;
    image.onerror = reject;
    image.src = imageUrl;
  });
};

export const getBackgroundInfo = ({ name, author, year }) => {
  return `Picture: ${name}. Author: ${author}. Year: ${year}`;
};

// {
//   "id": "6_02",
//   "name": "Card-Sharpers",
//   "imageSrc": "level6/6_02.jpg",
//   "cutSrc": "level6/cut/6_02.jpg",
//   "author": "OOST, Jacob van, the Elder",
//   "year": "1634"
// },
