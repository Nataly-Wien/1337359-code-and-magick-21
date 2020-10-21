'use strict';

(() => {
  const loadURL = `https://21.javascript.pages.academy/code-and-magick/data`;
  const sendURL = `https://21.javascript.pages.academy/code-and-magick`;
  const timeOut = 10000;
  const statusCode = {
    OK: 200,
  };

  const load = (onLoad, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === statusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(`Запрос к серверу завершен со статусом ${xhr.status} - ${xhr.statusText}`);
      }
    });

    xhr.addEventListener(`timeout`, () => onError(`Запрос к серверу не успел выполниться за ${xhr.timeout} мс`));
    xhr.addEventListener(`error`, () => onError(`Запрос не выполнен, произошла ошибка ${xhr.status} - ${xhr.statusText}`));

    xhr.timeout = timeOut;
    xhr.open(`GET`, loadURL);
    xhr.setRequestHeader(`Content-Type`, `multipart/form-data`);
    xhr.send();
  };

  const save = (data, onLoad, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === statusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(`Запрос к серверу завершен со статусом ${xhr.status} - ${xhr.statusText}`);
      }
    });

    xhr.addEventListener(`error`, () => onError(`Ошибка отправки данных`));
    xhr.addEventListener(`timeout`, () => onError(`Отправка данных не успела выполниться за ${xhr.timeout} мс`));

    xhr.timeout = timeOut;
    xhr.open(`POST`, sendURL);
    xhr.send(data);
  };

  window.backend = {
    load,
    save,
  };
})();
