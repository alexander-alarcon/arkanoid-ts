// Types
import { CanvasView } from "./views/CanvasView";
import { Paddle } from "./sprites/Paddle";
import { Brick } from "./sprites/Brick";
import { Ball } from "./sprites/Ball";

export class Collision {
  /**
   * Check if ball is colliding a brick
   * @param ball 
   * @param brick 
   * @returns true if collision detected
   */
  private isCollidingBrick(ball: Ball, brick: Brick): boolean {
    if (
      ball.pos.x < brick.pos.x + brick.width &&
      ball.pos.x + ball.width > brick.pos.x &&
      ball.pos.y < brick.pos.y + brick.height &&
      ball.pos.y + ball.height > brick.pos.y
    ) {
      return true
    }

    return false
  }

  isCollidingBricks(ball: Ball, bricks: Brick[]): boolean {
    let colliding = false;

    bricks.forEach((brick, i) => {
      if (this.isCollidingBrick(ball, brick)) {
        ball.changeYDirection();

        if (brick.energy === 1) {
          bricks.splice(i, 1)
        } else {
          brick.energy -= 1
        }
        colliding = true
      }
    })

    return colliding
  }

  /**
   * Check ball collision With paddle & walls
   * @param ball 
   * @param paddle 
   * @param view 
   */
  checkBallCollision(ball: Ball, paddle: Paddle, view: CanvasView): void {
    // 1. Check ball collision with paddle
    if (
      ball.pos.x + ball.width > paddle.pos.x &&
      ball.pos.x < paddle.pos.x + paddle.width &&
      ball.pos.y + ball.height === paddle.pos.y
    ) {
      ball.changeYDirection()
    }

    // 1. Check ball collision with wall
    if (
      ball.pos.x > view.canvas.width - ball.width ||
      ball.pos.x < 0
    ) {
      ball.changeXDirection()
    }

    // Ball movement Y constraints
    if (ball.pos.y < 0) {
      ball.changeYDirection()
    }
  }
}