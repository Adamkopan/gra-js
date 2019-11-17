class Game {
  constructor(canvas, ctx, width, height, speed, Xflag, start = false) {
    this.start = start;
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.xFlag = Xflag;
    this.ballPosition = {
      x: width / 2 - 300,
      y: height - 155,
    }
    this.lose = false;
    this.counter = 0;
    this.flagForFlag = false;
  }

  play() {
    const { ctx, canvas } = this;
    canvas.width = this.width;
    canvas.height = this.height;

    const flagOne = new Image();
    const flagTwo = new Image();
    const flagHandle = new Image();
    const hole = new Image();
    const newball = new Image();
    const curve = new Image();

    const data = positions();
    let itemsMap = [];
    let i = 0;
    let flagForEndcanvas = false;

    const line = new Line(canvas.width, canvas.height, this.xFlag, data);
    const ball = new Ball(30, 30, canvas.width, canvas.height);
    const ourFlag = new Flag(this.flagForFlag);

    const gameover = document.querySelector('.gameover');
    const elLevel = document.querySelector('.level');
    const myCounter = document.querySelector('.counter');
    myCounter.innerText = this.counter;

    elLevel.style.display = "block";
    elLevel.innerText = `Poziom: ${this.counter + 1}`;
    setTimeout(() => {
      elLevel.style.display = "none";
    }, 2000)

    line.draw(ctx, curve);
    ball.draw(ctx, newball);
    ourFlag.draw(ctx, flagHandle, flagOne, flagTwo, hole, this.xFlag, this.flagForFlag);

    const ballLoop = () => {
      const myLoop = () => {
        setTimeout(() => {
          if (i < data.length) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ourFlag.update(ctx, flagHandle, flagOne, flagTwo, hole, this.xFlag, this.flagForFlag);

            this.ballPosition = {
              x: itemsMap[i].x,
              y: itemsMap[i].y,
            }
            ball.update(ctx, newball, this.ballPosition.x, this.ballPosition.y);
            i += 1;
          }
        }, 150);
      }
      if (i < data.length) myLoop();
    }

    const lineAnim = () => {
      itemsMap = lineLoop(canvas, ctx, this.flagForFlag, this.xFlag, flagHandle, flagOne, flagTwo, this.lose, this.speed, line, curve, ball, newball, this.ballPosition.x, this.ballPosition.y, ourFlag, hole, itemsMap);
    }

    const animLoop = new AnimationFrame(30, lineAnim);
    const animLoopForBall = new AnimationFrame(30, ballLoop);

    const handleUp = () => {
      animLoop.stop();
      animLoopForBall.start();
      setTimeout(() => {
        if (itemsMap[itemsMap.length - 1].x === canvas.width) itemsMap[itemsMap.length - 1].x === canvas.width;
        if (itemsMap[itemsMap.length - 1].x > this.xFlag - 25 && itemsMap[itemsMap.length - 1].x < this.xFlag + 25 && flagForEndcanvas === false) {
          this.xFlag = random(790, 920);
          this.speed += 0.2;
          this.counter += 1;
          i = 0;
          myCounter.innerText = this.counter;
          elLevel.style.display = "block";
          elLevel.innerText = `Poziom: ${this.counter + 1}`;
          setTimeout(() => {
            elLevel.style.display = "none";
          }, 2000);
        } else if (itemsMap[itemsMap.length - 1].x < this.xFlag - 24 || itemsMap[itemsMap.length - 1].x > this.xFlag + 24 && itemsMap[itemsMap.length - 1].x < this.xFlag - 30 <= canvas.width) {
          animLoop.stop();
          gameover.style.display = "block";
          canvas.style.display = "none";
          this.lose = true;
          this.counter = 0;
        }
        line.tab = positions();
        animLoopForBall.stop();
        this.ballPosition = {
          x: canvas.width / 2 - 300,
          y: canvas.height - 155,
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ball.update(ctx, newball, this.ballPosition.x, this.ballPosition.y);
        ourFlag.update(ctx, flagHandle, flagOne, flagTwo, hole, this.xFlag, this.flagForFlag);
        itemsMap = line.drawUpdate(ctx, curve);
      }, 1000);
    }

    const handleDown = () => {
      animLoop.start();
      if (flagForEndcanvas === false) {
        setInterval(() => {
          if (itemsMap.length != 0) {
            if (itemsMap[itemsMap.length - 1].x >= canvas.width - 20) {
              animLoop.stop();
              flagForEndcanvas = true;
              animLoopForBall.start();
            }
            if (flagForEndcanvas) {
              setTimeout(() => {
                animLoopForBall.stop();
              }, 100);
            }
          }
        }, 100);
      }
      flagForEndcanvas = false;
    }

    if (this.lose === false) {
      canvas.addEventListener('mousedown', handleDown);
      setTimeout(() => {
        canvas.addEventListener('mouseup', handleUp)
      }, 100);
    }

    gameover.addEventListener('click', () => {
      gameover.style.display = "none";
      canvas.style.display = "block";
      this.lose = false;
      this.speed = 1;
      myCounter.innerText = 0;
      i = 0;
    });

    if (this.start === false) {
      canvas.style.display = "none";
    } else if (this.start) {
      canvas.style.display = "block";
    }

    setInterval(() => {
      this.flagForFlag = !this.flagForFlag;
      ctx.clearRect(this.xFlag + 12, 320, 60, 60);
      ourFlag.update(ctx, flagHandle, flagOne, flagTwo, hole, this.xFlag, this.flagForFlag);
    }, 1000);

    curve.src = "./img/object_dot.png";
    newball.src = "./img/object_ball.png";
    flagOne.src = "./img/object_flag_anim01.png";
    flagTwo.src = "./img/object_flag_anim02.png";
    flagHandle.src = "./img/object_flag_stick.png";
    hole.src = "./img/object_hole.png";
  }
}