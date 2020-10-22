'use strict';

(() => {
  const onTargetDown = (downEvt) => {
    downEvt.preventDefault();
    const elem = window.element;
    const target = window.target;

    if (elem === null || target === null) {
      return;
    }
    const startCoords = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };
    let isDragged = false;

    const onTargetMove = (moveEvt) => {
      moveEvt.preventDefault();
      isDragged = true;
      const shift = {
        x: moveEvt.clientX - startCoords.x,
        y: moveEvt.clientY - startCoords.y
      };

      elem.style.left = `${elem.offsetLeft + shift.x}px`;
      elem.style.top = `${elem.offsetTop + shift.y}px`;

      startCoords.x = moveEvt.clientX;
      startCoords.y = moveEvt.clientY;
    };

    const onTargetUp = (upEvt) => {
      upEvt.preventDefault(upEvt);

      if (isDragged) {
        const onTargetClick = (clickEvt) => {
          clickEvt.preventDefault();
          target.removeEventListener(`click`, onTargetClick);
        };

        target.addEventListener(`click`, onTargetClick);
      }

      document.removeEventListener(`mousemove`, onTargetMove);
      document.removeEventListener(`mouseup`, onTargetUp);
    };

    document.addEventListener(`mousemove`, onTargetMove);
    document.addEventListener(`mouseup`, onTargetUp);
  };

  const addMovingListener = (element, target) => {
    window.element = element;
    window.target = target;
    target.addEventListener(`mousedown`, onTargetDown);
  };

  const removeMovingListener = (element, target) => {
    target.removeEventListener(`mousedown`, onTargetDown);
    window.element = null;
    window.target = null;
  };

  window.moving = {
    addMovingListener,
    removeMovingListener,
  };
})();
