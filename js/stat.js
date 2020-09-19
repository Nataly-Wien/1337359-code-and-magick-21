'use strict';
const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const CLOUD_SHADOW_OFFSET = 10;
const CLOUD_COLOR = `#ffffff`;
const CLOUD_SHADOW_COLOR = `rgba(0, 0, 0, 0.7)`;
const TEXT_OFFSET_X = 55;
const TEXT_OFFSET_Y = 30;
const FONT_SIZE = 16;
const COLUMN_WIDTH = 40;
const COLUMN_GAP = 50;

window.renderStatistics = function (ctx, names, times) {
  const drawCloud = function (x, y, width, height, color) {
    const waveOffset = 5;
    const waveCountX = 5;
    const waveCountY = 3;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    const drawWave = function (count, isVertical, direction) {
      for (let i = 0; i < count; i++) {
        x += isVertical ? waveOffset * direction : width / (2 * count * direction);
        y += isVertical ? height / (2 * count * direction) : -waveOffset * direction;
        ctx.lineTo(x, y);
        x += isVertical ? -waveOffset * direction : width / (2 * count * direction);
        y += isVertical ? height / (2 * count * direction) : waveOffset * direction;
        ctx.lineTo(x, y);
      }
    };
    drawWave(waveCountY, true, 1);
    drawWave(waveCountX, false, 1);
    drawWave(waveCountY, true, -1);
    drawWave(waveCountX, false, -1);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();
  };

  drawCloud(CLOUD_X + CLOUD_SHADOW_OFFSET, CLOUD_Y + CLOUD_SHADOW_OFFSET, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_SHADOW_COLOR);
  drawCloud(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_COLOR);

  ctx.font = `${FONT_SIZE}px PT Mono`;
  ctx.fillStyle = `#000000`;
  ctx.fillText(`Ура, вы победили!`, CLOUD_X + TEXT_OFFSET_X, CLOUD_Y + TEXT_OFFSET_Y);
  ctx.fillText(`Список результатов:`, CLOUD_X + TEXT_OFFSET_X, CLOUD_Y + TEXT_OFFSET_Y + 1.2 * FONT_SIZE);

  const maxResult = Math.max(...times);
  const positionY = CLOUD_Y + CLOUD_HEIGHT - TEXT_OFFSET_Y + FONT_SIZE;
  names.forEach((item, i) => {
    let positionX = CLOUD_X + TEXT_OFFSET_X + (COLUMN_WIDTH + COLUMN_GAP) * i;
    let columnHeight = times[i] * 150 / maxResult;
    ctx.fillStyle = `#000000`;
    ctx.fillText(item, positionX, positionY);
    ctx.fillStyle = item === `Вы` ? `hsl(0, 100%, 50%)` : `hsl(240, ${Math.floor(Math.random() * 100)}%, 50%)`;
    ctx.fillRect(positionX, positionY - FONT_SIZE * 1.2 - columnHeight, COLUMN_WIDTH, columnHeight);
    ctx.fillStyle = `#000000`;
    ctx.fillText(Math.floor(times[i]), positionX, positionY - FONT_SIZE * 1.6 - columnHeight);
  });
};
