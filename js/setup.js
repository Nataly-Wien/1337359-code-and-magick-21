'use strict';

const FIRST_NAMES_LIST = [
  `Иван`,
  `Хуан Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`,
];

const NAMES_LIST = [
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Топольницкая`,
  `Нионго`,
  `Ирвинг`,
];

const COAT_COLORS_LIST = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`,
];

const EYES_COLORS_LIST = [
  `black`,
  `red`,
  `blue`,
  `yellow`,
  `green`,
];

const WIZARDS_NUMBER = 4;

const gameSetup = document.querySelector(`.setup`);
const similarWizardsList = gameSetup.querySelector(`.setup-similar-list`);
const wizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);


const getRandomInRange = (range) => Math.floor(Math.random() * range);

const getRandomFromList = (list) => list[getRandomInRange(list.length)];

const getWizardsList = () => {
  const wizardsList = [];

  for (let i = 0; i < WIZARDS_NUMBER; i++) {
    const firstName = getRandomFromList(FIRST_NAMES_LIST);
    const name = getRandomFromList(NAMES_LIST);

    wizardsList.push({
      name: Math.random() > 0.5 ? `${firstName} ${name}` : `${name} ${firstName}`,
      coatColor: getRandomFromList(COAT_COLORS_LIST),
      eyesColor: getRandomFromList(EYES_COLORS_LIST),
    });
  }

  return wizardsList;
};

const generateWizard = (wizard) => {
  const wizardItem = wizardTemplate.cloneNode(true);
  wizardItem.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardItem.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardItem.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardItem;
};

const getWizardsBlock = () => {
  const wizards = getWizardsList();
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < WIZARDS_NUMBER; i++) {
    fragment.appendChild(generateWizard(wizards[i]));
  }

  return fragment;
};


gameSetup.classList.remove(`hidden`);
similarWizardsList.appendChild(getWizardsBlock());
gameSetup.querySelector(`.setup-similar`).classList.remove(`hidden`);
