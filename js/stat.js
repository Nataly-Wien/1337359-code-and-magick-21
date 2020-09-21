'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const CLOUD_SHADOW_OFFSET = 10;
const CLOUD_COLOR = `#ffffff`;
const CLOUD_SHADOW_COLOR = `rgba(0, 0, 0, 0.7)`;

const GREETING_TEXT = `Ура, вы победили!`;
const RESULT_TEXT = `Список результатов:`;
const TEXT_OFFSET_X = 55;
const TEXT_OFFSET_Y = 30;
const TEXT_COLOR = `#000000`;
const FONT_SIZE = 16;
const LINE_SPACING = 4;

const COLUMN_WIDTH = 40;
const MAX_COLUMN_HIGHT = 150;
const COLUMN_GAP = 50;
const CURRENT_PLAYER_COLOR = `hsl(0, 100%, 50%)`;

const getColumnColor = function (name) {
  return name === `Вы` ? CURRENT_PLAYER_COLOR : `hsl(240, ${Math.floor(Math.random() * 100)}%, 50%)`;
};

const drawCloud = function (ctx, x, y, width, height, color) {
  const waveOffset = 5;
  const waveCountX = 5;
  const waveCountY = 3;

  const directionMap = new Map([
    [`down`, 1],
    [`up`, -1],
    [`right`, 1],
    [`left`, -1]
  ]);

  const drawWave = function (direction) {
    const isVertical = direction === `down` || direction === `up`;
    const count = isVertical ? waveCountY : waveCountX;

    for (let i = 0; i < count; i++) {
      x += isVertical ? waveOffset * directionMap.get(direction) : width / (2 * count * directionMap.get(direction));
      y += isVertical ? height / (2 * count * directionMap.get(direction)) : -waveOffset * directionMap.get(direction);
      ctx.lineTo(x, y);

      x += isVertical ? -waveOffset * directionMap.get(direction) : width / (2 * count * directionMap.get(direction));
      y += isVertical ? height / (2 * count * directionMap.get(direction)) : waveOffset * directionMap.get(direction);
      ctx.lineTo(x, y);
    }
  };

  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);

  drawWave(`down`);
  drawWave(`right`);
  drawWave(`up`);
  drawWave(`left`);

  ctx.stroke();
  ctx.closePath();
  ctx.fill();
};

window.renderStatistics = function (ctx, names, times) {

  drawCloud(ctx, CLOUD_X + CLOUD_SHADOW_OFFSET, CLOUD_Y + CLOUD_SHADOW_OFFSET, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_SHADOW_COLOR);
  drawCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_COLOR);

  ctx.font = `${FONT_SIZE}px PT Mono`;
  ctx.fillStyle = TEXT_COLOR;
  ctx.fillText(GREETING_TEXT, CLOUD_X + TEXT_OFFSET_X, CLOUD_Y + TEXT_OFFSET_Y);
  ctx.fillText(RESULT_TEXT, CLOUD_X + TEXT_OFFSET_X, CLOUD_Y + TEXT_OFFSET_Y + FONT_SIZE + LINE_SPACING);

  const maxResult = Math.max(...times);
  const positionY = CLOUD_Y + CLOUD_HEIGHT - TEXT_OFFSET_Y;

  names.forEach((name, i) => {
    const positionX = CLOUD_X + TEXT_OFFSET_X + (COLUMN_WIDTH + COLUMN_GAP) * i;
    const columnHeight = times[i] * MAX_COLUMN_HIGHT / maxResult;

    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(name, positionX, positionY + FONT_SIZE);
    ctx.fillText(Math.floor(times[i]), positionX, positionY - columnHeight - 2 * LINE_SPACING);

    ctx.fillStyle = getColumnColor(name);
    ctx.fillRect(positionX, positionY - columnHeight - LINE_SPACING, COLUMN_WIDTH, columnHeight);
  });
};
