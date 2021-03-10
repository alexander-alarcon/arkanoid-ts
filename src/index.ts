import { CanvasView } from "./views/CanvasView";
import { Paddle } from "./sprites/Paddle";
import { Collision } from "./Collision";
import { Brick } from "./sprites/Brick";
import { Ball } from "./sprites/Ball";


// Images
import PADDLE_IMAGE from './images/paddle.png'
import BALL_IMAGE from './images/ball.png'

// level and colors
import {
  BALL_SIZE,
  BALL_SPEED,
  BALL_STARTX,
  BALL_STARTY,
  PADDLE_SPEED,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_STARTX,
} from './setup'

import { createBricks } from "./helpers";

let gameOver = false
let score = 0

function setGameOver(view: CanvasView) {
  view.drawInfo('Game Over!!')
  gameOver = false
}

function setGameWin(view: CanvasView) {
  view.drawInfo('Game Won!!')
  gameOver = false
}

function gameLoop(
  view: CanvasView,
  bricks: Brick[],
  paddle: Paddle,
  ball: Ball,
  collision: Collision
) {
  view.clear()
  view.drawBricks(bricks)
  view.drawSprite(paddle)
  view.drawSprite(ball)

  // Move paddle and check so it won't exit the playfield
  if (
    (paddle.isMovingLeft && paddle.pos.x > 0) ||
    (paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width)
  ) {
    paddle.movePaddle()
  }

  // Move ball
  ball.moveBall()

  collision.checkBallCollision(ball, paddle, view)
  const colliding = collision.isCollidingBricks(ball, bricks);

  if (colliding) {
    score += 1;
    view.drawScore(score)
  }

  // Game Over when ball leaves playfield
  if (ball.pos.y > view.canvas.height) gameOver = true

  // If Game won, set game over and display win
  if (bricks.length === 0) return setGameWin(view)

  // return if Game Over and don't run requestAnimationFrame
  if (gameOver) return setGameOver(view)

  requestAnimationFrame(() => gameLoop(view, bricks, paddle, ball, collision))
}

function startGame(view: CanvasView) {
  // reset displays
  score = 0;
  view.drawInfo('')
  view.drawScore(0)

  // create all bricks 
  const bricks = createBricks();

  // create paddle
  const paddle = new Paddle(
    PADDLE_SPEED,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    {
      x: PADDLE_STARTX,
      y: view.canvas.height - PADDLE_HEIGHT - 5
    },
    PADDLE_IMAGE
  )

  // create ball
  const ball = new Ball(
    BALL_SIZE,
    {
      x: BALL_STARTX,
      y: BALL_STARTY
    },
    BALL_SPEED,
    BALL_IMAGE
  )

  // create collision
  const collision = new Collision()
  gameLoop(view, bricks, paddle, ball, collision)
}

// create a view
const view = new CanvasView('#playField')
view.initStartButton(startGame)

