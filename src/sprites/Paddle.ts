import { Vector } from '../types';

export class Paddle {
  private paddleImage: HTMLImageElement = new Image()
  private moveLeft: boolean
  private moveRight: boolean

  constructor(
    private speed: number,
    private paddleWidth: number,
    private paddleHeight: number,
    private position: Vector,
    image: string
  ) {
    this.moveLeft = false;
    this.moveRight = false;
    this.paddleImage.src = image

    // Add Event listeners
    document.addEventListener('keydown', this.handleKeyDown)
    document.addEventListener('keyup', this.handleKeyUp)
  }

  // getters
  public get width(): number {
    return this.paddleWidth
  }

  public get height(): number {
    return this.paddleHeight
  }

  public get pos(): Vector {
    return this.position
  }

  public get image(): HTMLImageElement {
    return this.paddleImage
  }

  public get isMovingLeft(): boolean {
    return this.moveLeft
  }

  public get isMovingRight(): boolean {
    return this.moveRight
  }

  movePaddle = (): void => {
    if (this.moveLeft) this.pos.x -= this.speed
    if (this.moveRight) this.pos.x += this.speed
  }

  handleKeyUp = ({ code, key }: KeyboardEvent): void => {
    if (code === "ArrowLeft" || key === "ArrowLeft") this.moveLeft = false
    if (code === "ArrowRight" || key === "ArrowRight") this.moveRight = false
  }

  handleKeyDown = ({ code, key }: KeyboardEvent): void => {
    if (code === "ArrowLeft" || key === "ArrowLeft") this.moveLeft = true
    if (code === "ArrowRight" || key === "ArrowRight") this.moveRight = true
  }
}
