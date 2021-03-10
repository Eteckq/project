import { Vector3 } from '../../../../node_modules/@math.gl/core/src/index'
import { initTexture } from '../../utils/utils'
import Damager from '../interface/damager'
import Rectangle from './rectangle'

export default abstract class Missile extends Rectangle implements Damager {
  protected speed: number = 0.5
  public attack: number = 10

  constructor(
    position: Vector3,
    texture: string,
    width: number,
    height: number
  ) {
    super(position, texture, width, height)
  }

  public tick(elapsed: number) {
    if (
      this.position[1] > 1.2 ||
      this.position[1] < -1.2 ||
      this.position[0] > 1.2 ||
      this.position[0] < -1.2
    ) {
      this.clear()
      return
    }
    this.time += 0.01 * elapsed
    this.update()
  }
  abstract update(): void
}
