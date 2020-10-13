'use strict';

const openSetupBlock = document.querySelector(`.setup-open`);
const closeButton = document.querySelector(`.setup-close`);
const {
  options: {
    gameSetup,
    uploadIcon
  }
} = window;

const setupCoords = {
  x: 0,
  y: 0
};

const openSetup = () => {
  setupCoords.x = gameSetup.style.left;
  setupCoords.y = gameSetup.style.top;
  gameSetup.classList.remove(`hidden`);
  document.addEventListener(`keydown`, onDocumentClick);
  closeButton.addEventListener(`click`, closeSetup);
  closeButton.addEventListener(`keydown`, onCloseButtonDown);
  window.formValidation.setFormValidation();
  window.colorize.setPlayerColoration();
  window.moving.addMovingListener(gameSetup, uploadIcon);
};

const closeSetup = () => {
  gameSetup.classList.add(`hidden`);
  gameSetup.style.left = setupCoords.x;
  gameSetup.style.top = setupCoords.y;
  document.removeEventListener(`keydown`, onDocumentClick);
  closeButton.removeEventListener(`click`, closeSetup);
  closeButton.removeEventListener(`keydown`, onCloseButtonDown);
  window.formValidation.removeFormValidation();
  window.colorize.removePlayerColoration();
  window.moving.removeMovingListener(gameSetup, uploadIcon);
};

const onDocumentClick = (evt) => {
  if (evt.key === `Escape` && gameSetup.querySelector(`.setup-user-name`) !== document.activeElement) {
    evt.preventDefault();
    closeSetup();
  }
};

const onCloseButtonDown = (evt) => {
  if (evt.key === `Enter`) {
    closeSetup();
  }
};


openSetupBlock.addEventListener(`click`, openSetup);
openSetupBlock.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    openSetup();
  }
});

window.data.addWizardsBlock();
