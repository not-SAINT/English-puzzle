const createDomElement = (elementName = 'div', className) => {
  const newElement = document.createElement(elementName);
  if (className) {
    newElement.classList.add(className);
  }

  return newElement;  
}

const getRandomIndex = (length) => {
  return Math.floor(Math.random() * length);
}

const getIdFromStr = (value) => {
  return value.replace(/[^a-z0-9]/gmi, '');
}

const playSound = (source, volume = 0.3) => {
  if (source) {
    const audio = new Audio();
    audio.src = source;
    audio.volume = volume;
    audio.autoplay = true;
  }  
}

export {
  createDomElement, getRandomIndex, getIdFromStr, playSound
};
