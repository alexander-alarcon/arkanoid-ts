import { Vector } from '../types';

export class Brick {
  private brickImage: HTMLImageElement = new Image()

  constructor(
    private brickWidth: number,
    private brickHeight: number,
    private position: Vector,
    private brickEnergy: number,
    image: string
  ) {
    this.brickImage.src = image
  }

  // getters
  public get width(): number {
    return this.brickWidth
  }

  public get height(): number {
    return this.brickHeight
  }

  public get pos(): Vector {
    return this.position
  }

  public get image(): HTMLImageElement {
    return this.brickImage
  }

  public get energy(): number {
    return this.brickEnergy
  }

  // setters
  public set energy(energy: number) {
    this.brickEnergy = energy;
  }
}
