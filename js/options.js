'use strict';

(() => {
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

  const gameSetup = document.querySelector(`.setup`);
  const uploadIcon = document.querySelector(`.upload`);

  window.options = {
    COAT_COLORS_LIST,
    EYES_COLORS_LIST,
    FIREBALL_COLORS_LIST,
    gameSetup,
    uploadIcon
  };
})();
