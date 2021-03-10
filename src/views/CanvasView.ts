// types
import { Paddle } from '~/sprites/Paddle';
import { Brick } from '~/sprites/Brick';
import { Ball } from '~/sprites/Ball';

export class CanvasView {
  canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D | null
  private scoreDisplay: HTMLObjectElement | null
  private start: HTMLObjectElement | null
  private info: HTMLObjectElement | null

  constructor(canvasName: string) {
    this.canvas = document.querySelector(canvasName) as HTMLCanvasElement
    this.context = this.canvas.getContext('2d')
    this.scoreDisplay = document.querySelector('#score')
    this.start = document.querySelector('#start')
    this.info = document.querySelector('#info')
  }

  /**
   * Clear the canvas 
   */
  clear(): void {
    this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  /**
   * Add listener to start button
   * @param startFunction
   */
  initStartButton(startFunction: (view: CanvasView) => void): void {
    this.start?.addEventListener('click', () => {
      startFunction(this)
    })
  }

  drawScore(score: number): void {
    if (this.scoreDisplay) this.scoreDisplay.innerText = score.toString()
  }

  drawInfo(text: string): void {
    if (this.info) this.info.innerText = text
  }

  drawSprite(element: Brick | Paddle | Ball): void {
    if (!element) return

    this.context?.drawImage(
      element.image,
      element.pos.x,
      element.pos.y,
      element.width,
      element.height
    )
  }

  drawBricks(bricks: Brick[]): void {
    bricks.forEach(brick => this.drawSprite(brick))
  }
}