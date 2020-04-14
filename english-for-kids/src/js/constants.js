import cards from './cards';
import { getIdFromStr } from './worker';

const CATEGORIES = cards[0];
const CATEGORY_IDS = cards[0].map(category => getIdFromStr(category));
const allCards = cards.slice(1);
const ROTATE_ICO = 'img/rotate.svg';

export {
  CATEGORIES, allCards, CATEGORY_IDS, ROTATE_ICO
}

