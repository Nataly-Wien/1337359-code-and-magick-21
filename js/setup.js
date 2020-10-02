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

const FIREBALL_COLORS_LIST = [
  `#ee4830`,
  `#30a8ee`,
  `#5ce6c0`,
  `#e848d5`,
  `#e6e848`,
];

const WIZARDS_NUMBER = 4;
const USERNAME_MINLENGTH = 2;
const USERNAME_MAXLENGTH = 25;

const usernameValidationMessages = [
  `Введите имя персонажа`,
  `Имя персонажа должно состоять минимум из ${USERNAME_MINLENGTH}-х символов`,
  `Максимальная длина имени персонажа - ${USERNAME_MAXLENGTH} символов`,
  `Введите еще`,
  `Удалите лишние`,
];

const gameSetup = document.querySelector(`.setup`);
const similarWizardsList = gameSetup.querySelector(`.setup-similar-list`);
const wizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);
const openSetupBlock = document.querySelector(`.setup-open`);
const closeButton = document.querySelector(`.setup-close`);
const usernameField = document.querySelector(`.setup-user-name`);
const wizardCoat = document.querySelector(`.setup-wizard .wizard-coat`);
const wizardCoatField = document.querySelector(`input[name="coat-color"]`);
const wizardEyes = document.querySelector(`.setup-wizard .wizard-eyes`);
const wizardEyesField = document.querySelector(`input[name="eyes-color"]`);
const fireballWrap = document.querySelector(`.setup-fireball-wrap`);
const fireball = document.querySelector(`.setup-fireball`);
const fireballField = document.querySelector(`input[name="fireball-color"]`);
const setupPlayer = document.querySelector(`.setup-player`);

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


const openSetup = () => {
  gameSetup.classList.remove(`hidden`);
  document.addEventListener(`keydown`, onDocumentClick);
  closeButton.addEventListener(`click`, closeSetup);
  closeButton.addEventListener(`keydown`, onCloseButtonDown);
  usernameField.addEventListener(`invalid`, onUsernameFieldInvalid);
  usernameField.addEventListener(`input`, onUsernameFieldInput);
  setupPlayer.addEventListener(`click`, onPlayerClick);
};


const closeSetup = () => {
  gameSetup.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onDocumentClick);
  closeButton.removeEventListener(`click`, closeSetup);
  closeButton.removeEventListener(`keydown`, onCloseButtonDown);
  usernameField.removeEventListener(`invalid`, onUsernameFieldInvalid);
  usernameField.removeEventListener(`input`, onUsernameFieldInput);
  setupPlayer.removeEventListener(`click`, onPlayerClick);
};

const onDocumentClick = (evt) => {
  if (evt.key === `Escape` && usernameField !== document.activeElement) {
    evt.preventDefault();
    closeSetup();
  }
};

const onCloseButtonDown = (evt) => {
  if (evt.key === `Enter`) {
    closeSetup();
  }
};

const onUsernameFieldInvalid = () => {
  switch (true) {
    case usernameField.validity.valueMissing:
      usernameField.setCustomValidity(usernameValidationMessages[0]);
      break;
    case usernameField.validity.tooShort:
      usernameField.setCustomValidity(usernameValidationMessages[1]);
      break;
    case usernameField.validity.tooLong:
      usernameField.setCustomValidity(usernameValidationMessages[2]);
      break;
    default:
      usernameField.setCustomValidity(``);
  }
};

const getWordForm = (number, forms) => {
  const cases = [2, 0, 1, 1, 1, 2];
  number = Math.floor(Math.abs(number)) % 100;

  return forms[number > 4 && number < 20 ? 2 : cases[Math.min(number % 10, 5)]];
};

const onUsernameFieldInput = () => {
  const fieldLength = usernameField.value.length;

  if (fieldLength < USERNAME_MINLENGTH) {
    usernameField.setCustomValidity(`${usernameValidationMessages[3]} ${USERNAME_MINLENGTH -
      fieldLength} ${getWordForm(USERNAME_MINLENGTH - fieldLength, [`символ`, `символа`, `символов`])}`);
  } else if (fieldLength > USERNAME_MAXLENGTH) {
    usernameField.setCustomValidity(`${usernameValidationMessages[4]} ${fieldLength -
      USERNAME_MAXLENGTH} ${getWordForm(fieldLength - USERNAME_MAXLENGTH, [`символ`, `символа`, `символов`])}`);
  } else {
    usernameField.setCustomValidity(``);
  }
};

const onPlayerClick = (evt) => {
  switch (evt.target) {
    case fireball:
      fireballField.value = getRandomFromList(FIREBALL_COLORS_LIST);
      fireballWrap.style.backgroundColor = fireballField.value;
      break;
    case wizardEyes:
      wizardEyesField.value = getRandomFromList(EYES_COLORS_LIST);
      wizardEyes.style.fill = wizardEyesField.value;
      break;
    case wizardCoat:
      wizardCoatField.value = getRandomFromList(COAT_COLORS_LIST);
      wizardCoat.style.fill = wizardCoatField.value;
      break;
  }
};


openSetupBlock.addEventListener(`click`, openSetup());
openSetupBlock.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    openSetup();
  }
});

similarWizardsList.appendChild(getWizardsBlock());
gameSetup.querySelector(`.setup-similar`).classList.remove(`hidden`);
