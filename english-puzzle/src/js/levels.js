import level1 from './levels/level1';
import level2 from './levels/level2';
import level3 from './levels/level3';
import level4 from './levels/level4';
import level5 from './levels/level5';
import level6 from './levels/level6';

export const getBackgroundPictureObject = (level, round) => {
  switch (level) {
    case 1:
      return level1[round];
    case 2:
      return level2[round];
    case 3:
      return level3[round];
    case 4:
      return level4[round];
    case 5:
      return level5[round];
    case 6:
      return level6[round];

    default:
      return level1[round];
  }
};

export const newFunc = () => {};
