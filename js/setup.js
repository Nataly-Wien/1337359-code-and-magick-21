'use strict';

const FIRST_NAMES_LIST = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const NAMES_LIST = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS_LIST = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES_COLORS_LIST = [`black`, `red`, `blue`, `yellow`, `green`];

const VIZARDS_NUMBER = 4;

const getRandomInRange = (range) => Math.floor(Math.random() * range);

const getRandomFromList = (list) => list[getRandomInRange(list.length)];

const getWizardsList = function () {
  let wizardsList = [];
  for (let i = 0; i < VIZARDS_NUMBER; i++) {
    const firstName = getRandomFromList(FIRST_NAMES_LIST);
    const name = getRandomFromList(NAMES_LIST);
    const wizard = {
      name: getRandomInRange(2) ? `${firstName} ${name}` : `${name} ${firstName}`,
      coatColor: getRandomFromList(COAT_COLORS_LIST),
      eyesColor: getRandomFromList(EYES_COLORS_LIST)
    };
    wizardsList.push(wizard);
  }
  return wizardsList;
};

const getWizardsBlock = function () {

  const getWizardExemplar = function (template, wizard) {
    const wizardExemplar = template.cloneNode(true);
    wizardExemplar.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardExemplar.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
    wizardExemplar.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;
    return wizardExemplar;
  };

  let fragment = document.createDocumentFragment();
  const wizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
  const wizards = getWizardsList();

  for (let i = 0; i < VIZARDS_NUMBER; i++) {
    fragment.appendChild(getWizardExemplar(wizardTemplate, wizards[i]));
  }
  return fragment;
};


const gameSetup = document.querySelector(`.setup`);
gameSetup.classList.remove(`hidden`);

const similarWizardsList = gameSetup.querySelector(`.setup-similar-list`);
similarWizardsList.appendChild(getWizardsBlock());

gameSetup.querySelector(`.setup-similar`).classList.remove(`hidden`);
