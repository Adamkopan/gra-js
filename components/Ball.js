class Ball {
  constructor(height, width, gameWidth, gameHeight) {
    this.gameHeight = gameHeight;
    this.gameWidth = gameWidth;
    this.height = height;
    this.width = width;
  }

  draw(ctx, ball) {
    ball.addEventListener('load', () => {
      ctx.drawImage(ball, this.gameWidth / 2 - 300, this.gameHeight - 155, this.width, this.height);
    })
  }
  update(ctx, ball, positionX, positionY) {
    ctx.drawImage(ball, positionX, positionY, this.width, this.height);
  }

}