'use strict';

(() => {
  const setupPlayer = window.options.gameSetup.querySelector(`.setup-player`);

  const wizardCoat = setupPlayer.querySelector(`.setup-wizard .wizard-coat`);
  const wizardCoatField = setupPlayer.querySelector(`input[name="coat-color"]`);
  const wizardEyes = setupPlayer.querySelector(`.setup-wizard .wizard-eyes`);
  const wizardEyesField = setupPlayer.querySelector(`input[name="eyes-color"]`);
  const fireballWrap = setupPlayer.querySelector(`.setup-fireball-wrap`);
  const fireball = setupPlayer.querySelector(`.setup-fireball`);
  const fireballField = setupPlayer.querySelector(`input[name="fireball-color"]`);

  const onPlayerClick = (evt) => {
    switch (evt.target) {
      case fireball:
        fireballField.value = window.utils.getRandomFromList(window.options.FIREBALL_COLORS_LIST);
        fireballWrap.style.backgroundColor = fireballField.value;
        break;
      case wizardEyes:
        wizardEyesField.value = window.utils.getRandomFromList(window.options.EYES_COLORS_LIST);
        wizardEyes.style.fill = wizardEyesField.value;
        break;
      case wizardCoat:
        wizardCoatField.value = window.utils.getRandomFromList(window.options.COAT_COLORS_LIST);
        wizardCoat.style.fill = wizardCoatField.value;
        break;
    }
  };

  const setPlayerColoration = () => setupPlayer.addEventListener(`click`, onPlayerClick);
  const removePlayerColoration = () => setupPlayer.removeEventListener(`click`, onPlayerClick);

  window.colorize = {
    setPlayerColoration,
    removePlayerColoration,
  };
})();
