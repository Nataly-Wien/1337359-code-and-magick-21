'use strict';

(() => {
  const USERNAME_MINLENGTH = 2;
  const USERNAME_MAXLENGTH = 25;

  const usernameValidationMessages = [
    `Введите имя персонажа`,
    `Имя персонажа должно состоять минимум из ${USERNAME_MINLENGTH}-х символов`,
    `Максимальная длина имени персонажа - ${USERNAME_MAXLENGTH} символов`,
    `Введите еще`,
    `Удалите лишние`,
  ];

  const setupForm = window.options.gameSetup.querySelector(`.setup-wizard-form`);
  const usernameField = setupForm.querySelector(`.setup-user-name`);

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

  const onUsernameFieldInput = () => {
    const fieldLength = usernameField.value.length;

    if (fieldLength < USERNAME_MINLENGTH) {
      usernameField.setCustomValidity(`${usernameValidationMessages[3]} ${USERNAME_MINLENGTH -
        fieldLength} ${window.utils.getWordForm(USERNAME_MINLENGTH - fieldLength, [`символ`, `символа`, `символов`])}`);
    } else if (fieldLength > USERNAME_MAXLENGTH) {
      usernameField.setCustomValidity(`${usernameValidationMessages[4]} ${fieldLength -
        USERNAME_MAXLENGTH} ${window.utils.getWordForm(fieldLength - USERNAME_MAXLENGTH, [`символ`, `символа`, `символов`])}`);
    } else {
      usernameField.setCustomValidity(``);
    }
  };

  const onSubmit = (evt) => {
    const data = new FormData(setupForm);

    // for (let key of data.keys()) {
    //   console.log(data.get(key));
    // }
    window.backend.save(data, () => window.options.gameSetup.classList.add(`hidden`), window.utils.showError);

    evt.preventDefault();
  };

  const setFormHandlers = () => {
    usernameField.addEventListener(`invalid`, onUsernameFieldInvalid);
    usernameField.addEventListener(`input`, onUsernameFieldInput);
    setupForm.addEventListener(`submit`, onSubmit);
  };

  const removeFormHandlers = () => {
    usernameField.removeEventListener(`invalid`, onUsernameFieldInvalid);
    usernameField.removeEventListener(`input`, onUsernameFieldInput);
    setupForm.removeEventListener(`submit`, onSubmit);
  };

  window.form = {
    setFormHandlers,
    removeFormHandlers,
  };
})();
