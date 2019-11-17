class Line {
  constructor(gameWidth, gameHeight, xFlag, data) {
    this.gameHeight = gameHeight;
    this.gameWidth = gameWidth;
    this.xFlag = xFlag;
    this.tab = data;
  }
  draw(ctx, line) {
    line.addEventListener('load', () => {
      for (let i = 0; i < this.tab.length; i++) {
        ctx.drawImage(line, this.tab[i].x, this.tab[i].y, 15, 15);
      }
    });
  }

  drawUpdate(ctx, line) {
    for (let i = 0; i < this.tab.length; i++) {
      ctx.drawImage(line, this.tab[i].x, this.tab[i].y, 15, 15);
    }
    return this.tab;
  }


  update(speed) {
    let changeX = 0.3;
    let changeY = 0.1;
    let changeXsecond = 3.3;
    let changeYsecond = 0.9;
    let ione = 0;
    let itwo = 9;
    while (ione < 9) {
      this.tab[ione].x += changeX * speed;
      this.tab[ione].y -= changeY * speed;
      changeX += 0.3;
      changeY += 0.1;
      ione++;
    }
    while (itwo <= 18) {
      this.tab[itwo].x += changeXsecond * speed;
      this.tab[itwo].y -= changeYsecond * speed;
      changeXsecond += 0.3;
      changeYsecond -= 0.1;
      itwo++;
    }
  }
}
