'use strict';

(() => {
  const onHandleDown = (elem, handleToMove) => (downEvt) => {
    downEvt.preventDefault();
    const startCoords = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };
    let isMove = false;

    const onHandleMove = (moveEvt) => {
      moveEvt.preventDefault();
      isMove = true;
      const shift = {
        x: moveEvt.clientX - startCoords.x,
        y: moveEvt.clientY - startCoords.y
      };

      elem.style.left = `${elem.offsetLeft + shift.x}px`;
      elem.style.top = `${elem.offsetTop + shift.y}px`;

      startCoords.x = moveEvt.clientX;
      startCoords.y = moveEvt.clientY;
    };

    const onHandleUp = (upEvt) => {
      upEvt.preventDefault(upEvt);
      if (isMove) {
        const onHandleClick = (clickEvt) => {
          clickEvt.preventDefault();
          handleToMove.removeEventListener(`click`, onHandleClick);
        };

        handleToMove.addEventListener(`click`, onHandleClick);
      }
      document.removeEventListener(`mousemove`, onHandleMove);
      document.removeEventListener(`mouseup`, onHandleUp);
    };

    document.addEventListener(`mousemove`, onHandleMove);
    document.addEventListener(`mouseup`, onHandleUp);
  };

  const addMovingListener = (element, handle) => {
    handle.addEventListener(`mousedown`, onHandleDown(element, handle));
  };

  const removeMovingListener = (element, handle) => {
    handle.removeEventListener(`mousedown`, onHandleDown(element, handle));
  };

  window.moving = {
    addMovingListener,
    removeMovingListener,
  };
})();
