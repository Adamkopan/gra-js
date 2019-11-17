const lineLoop = (canvas, ctx, flagForFlag, xFlag, flagHandle, flagOne, flagTwo, lose, speed, line, curve, ball, newball, ballPositionX, ballPositionY, ourFlag, hole) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ourFlag.update(ctx, flagHandle, flagOne, flagTwo, hole, xFlag, flagForFlag);

  if (lose === false) {
    line.update(speed);
  }
  const itemsMap = line.drawUpdate(ctx, curve);
  ball.update(ctx, newball, ballPositionX, ballPositionY);
  return itemsMap;
}