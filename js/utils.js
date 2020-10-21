'use strict';

(() => {
  const getRandomInRange = (range) => Math.floor(Math.random() * range);

  const getRandomFromList = (list) => list[getRandomInRange(list.length)];

  const getWordForm = (number, forms) => {
    const cases = [2, 0, 1, 1, 1, 2];
    number = Math.floor(Math.abs(number)) % 100;

    return forms[number > 4 && number < 20 ? 2 : cases[Math.min(number % 10, 5)]];
  };

  const showError = (message) => {
    const errorBlock = document.createElement(`div`);

    errorBlock.style.position = `absolute`;
    errorBlock.style.zIndex = 30;
    errorBlock.style.width = `60%`;
    errorBlock.style.top = `200px`;
    errorBlock.style.left = `15%`;
    errorBlock.style.margin = `0 auto`;
    errorBlock.style.padding = `20px`;
    errorBlock.style.fontSize = `24px`;
    errorBlock.style.textAlign = `center`;
    errorBlock.style.backgroundColor = `tomato`;
    errorBlock.style.color = `white`;
    errorBlock.textContent = message;

    window.options.gameSetup.insertAdjacentElement(`afterbegin`, errorBlock);
  };

  window.utils = {
    getRandomFromList,
    getWordForm,
    showError,
  };
})();
