'use strict';

(() => {
  const WIZARDS_NUMBER = 4;

  const similarWizardsList = window.options.gameSetup.querySelector(`.setup-similar-list`);
  const wizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);

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
