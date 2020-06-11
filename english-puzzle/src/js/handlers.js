import { getCountPagesPerLevel, getRoundDataTest } from './backend';

export const onStartButtonClick = () => {
  document.querySelector('.start-page').classList.add('hide');
};

export const onTestClick = async () => {
  // get new words

  const selectLevel = document.getElementById('level');
  const level = selectLevel.options[selectLevel.selectedIndex].value;

  const selectPage = document.getElementById('page');
  const page = selectPage.options[selectPage.selectedIndex].value;

  // const countPagesPerLevel = await getCountPagesPerLevel(level);
  const res = await getRoundDataTest();

  // console.log(`level = ${level} count pages = ${countPagesPerLevel}`);
  console.log(`level = ${level} count pages = ${res.length}`);
};

// export const onTestClick = async () => {
//   // get new words

//   const selectLevel = document.getElementById('level');
//   const level = selectLevel.options[selectLevel.selectedIndex].value;

//   const selectPage = document.getElementById('page');
//   const page = selectPage.options[selectPage.selectedIndex].value;

//   // const countPagesPerLevel = await getCountPagesPerLevel(level);
//   const res = await getRoundDataTest();

//   // console.log(`level = ${level} count pages = ${countPagesPerLevel}`);
//   console.log(`level = ${level} count pages = ${res.length}`);
// };
