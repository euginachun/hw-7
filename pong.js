var puck = {
  x: 200,
  y: 200,
  xSpeed: 1,
  ySpeed: -1,
  r: 15
};

var edgeOffset = 20;

var player1 = {
  x: edgeOffset,
  y: 200,
  ht: 50,
  wd: 10,
  score: 0
};

var player2 = {
  x: 400 - edgeOffset,
  y: 200,
  ht: 50,
  wd: 10,
  score: 0
};


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  text("Player 1", 140, 25);
  text("Player 2", 220, 25);
  p1ScoreDisplay = text(player1.score, 180, 50);
  p2ScoreDisplay = text(player2.score, 220, 50);
    // draw puck
    ellipse(puck.x, puck.y, puck.r * 2);


  // move puck
  if (puck.y < puck.r || puck.y > height - puck.r) {
    puck.ySpeed = -puck.ySpeed;
  }

  puck.x += puck.xSpeed;
  puck.y += puck.ySpeed;

  // draw paddles
  rect(player1.x, player1.y, player1.wd, player1.ht);
  rect(player2.x - player2.wd, player2.y, player2.wd, player2.ht);

  // paddle movement
  if (player1.paddleDown && !player1.paddleUp) {
    player1.y += 3;
  }
  if (player1.paddleUp && !player1.paddleDown) {
    player1.y -= 3;
  }

  if (player2.paddleDown && !player2.paddleUp) {
    player2.y += 3;
  }
  if (player2.paddleUp && !player2.paddleDown) {
    player2.y -= 3;
  }

  // don't let paddles outside of the play area
  player1.y = constrain(player1.y, 0, height - player1.ht - 1);
  player2.y = constrain(player2.y, 0, height - player2.ht - 1);

  // bounce puck on paddles -- player 1 -- based on x-coordinate
  if (puck.x - puck.r < player1.x + player1.wd) {
    // check if puck is within paddle height...
    if (puck.y > player1.y && puck.y < player1.y + player1.ht) {
      puck.xSpeed = abs(puck.xSpeed);
    } else {
      player2.score++;
      puck.x = 200;
      puck.y = 200;
      puck.xSpeed = 1;
      puck.ySpeed = -1;
      puck.r = 15;
      
    }
  }

  // bounce puck on paddles -- player 2 -- based on x-coordinate
  if (puck.x + puck.r > player2.x - player2.wd) {
    // check if puck is within paddle height...
    if (puck.y > player2.y && puck.y < player2.y + player2.ht) {
      puck.xSpeed = -abs(puck.xSpeed);
    } else {
      player1.score++;
      puck.x = 200;
      puck.y = 200;
      puck.xSpeed = 1;
      puck.ySpeed = -1;
      puck.r = 15;
    }
  }
}


// keyboard input
function keyPressed() {
  print(key);
  if (key == 'A') {
    player1.paddleDown = true;
  } else if (key == 'Q') {
    player1.paddleUp = true;
  }

  if (keyCode == DOWN_ARROW) {
    player2.paddleDown = true;
  } else if (keyCode == UP_ARROW) {
    player2.paddleUp = true;
  }
}

function keyReleased() {
  if (key == 'A') {
    player1.paddleDown = false;
  } else if (key == 'Q') {
    player1.paddleUp = false;
  }

  if (keyCode == DOWN_ARROW) {
    player2.paddleDown = false;
  } else if (keyCode == UP_ARROW) {
    player2.paddleUp = false;
  }
}
