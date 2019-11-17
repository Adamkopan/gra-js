class Flag {
  draw(ctx, flagHandle, flagOne, flagTwo, hole, xFlag, flagForFlag) {
    flagHandle.addEventListener('load', () => {
      ctx.drawImage(flagHandle, xFlag, 330, 12, 154);
    })
    flagOne.addEventListener('load', () => {
      ctx.drawImage(flagForFlag ? flagOne : flagTwo, xFlag + 12, 320, 60, 60);
    })
    hole.addEventListener('load', () => {
      ctx.drawImage(hole, xFlag - 24, 484, 60, 30);
    })
  }
  update(ctx, flagHandle, flagOne, flagTwo, hole, xFlag, flagForFlag) {
    ctx.drawImage(flagHandle, xFlag, 330, 12, 154);
    ctx.drawImage(flagForFlag ? flagOne : flagTwo, xFlag + 12, 320, 60, 60);
    ctx.drawImage(hole, xFlag - 24, 484, 60, 30);
  }
}