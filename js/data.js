'use strict';

(() => {
  const WIZARDS_NUMBER = 4;

  const similarWizardsList = window.options.gameSetup.querySelector(`.setup-similar-list`);
  const wizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);

  // const FIRST_NAMES_LIST = [
  //   `Иван`,
  //   `Хуан Себастьян`,
  //   `Мария`,
  //   `Кристоф`,
  //   `Виктор`,
  //   `Юлия`,
  //   `Люпита`,
  //   `Вашингтон`,
  // ];

  // const NAMES_LIST = [
  //   `да Марья`,
  //   `Верон`,
  //   `Мирабелла`,
  //   `Вальц`,
  //   `Онопко`,
  //   `Топольницкая`,
  //   `Нионго`,
  //   `Ирвинг`,
  // ];

  // const getWizardsList = () => {
  //   const wizardsList = [];

  //   for (let i = 0; i < WIZARDS_NUMBER; i++) {
  //     const firstName = window.utils.getRandomFromList(FIRST_NAMES_LIST);
  //     const name = window.utils.getRandomFromList(NAMES_LIST);

  //     wizardsList.push({
  //       name: Math.random() > 0.5 ? `${firstName} ${name}` : `${name} ${firstName}`,
  //       coatColor: window.utils.getRandomFromList(window.options.COAT_COLORS_LIST),
  //       eyesColor: window.utils.getRandomFromList(window.options.EYES_COLORS_LIST),
  //     });
  //   }

  //   return wizardsList;
  // };

  // const generateWizard = (wizard) => {
  //   const wizardItem = wizardTemplate.cloneNode(true);
  //   wizardItem.querySelector(`.setup-similar-label`).textContent = wizard.name;
  //   wizardItem.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  //   wizardItem.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  //   return wizardItem;
  // };

  // const getWizardsBlock = () => {

  //   const wizards = getWizardsList();
  //   const fragment = document.createDocumentFragment();

  //   for (let i = 0; i < WIZARDS_NUMBER; i++) {
  //     fragment.appendChild(generateWizard(wizards[i]));
  //   }

  //   return fragment;
  // };

  // const addWizardsBlock = () => {
  //   similarWizardsList.appendChild(getWizardsBlock());
  //   window.options.gameSetup.querySelector(`.setup-similar`).classList.remove(`hidden`);
  // };

  const generateWizard = (wizard) => {
    const wizardItem = wizardTemplate.cloneNode(true);
    wizardItem.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardItem.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    wizardItem.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;

    return wizardItem;
  };

  const getWizardsBlock = (wizards) => {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < WIZARDS_NUMBER; i++) {
      fragment.appendChild(generateWizard(wizards[i]));
    }

    similarWizardsList.appendChild(fragment);
    window.options.gameSetup.querySelector(`.setup-similar`).classList.remove(`hidden`);
  };

  const addWizardsBlock = () => {
    window.backend.load(getWizardsBlock, window.utils.showError);
  };

  window.data = {
    addWizardsBlock,
  };
})();
