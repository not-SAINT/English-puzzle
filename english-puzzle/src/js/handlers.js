export const onStartButtonClick = () => {
  document.querySelector('.start-page').classList.add('hide');
};

export const onModalClose = () => {
  document.querySelector('.modal').classList.remove('is-active');
};

export const onModalOpen = () => {
  document.querySelector('.modal').classList.add('is-active');
};
