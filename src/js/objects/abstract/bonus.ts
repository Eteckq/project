import Player from '../player'
import BoundedEntity from './bounded-entity'

export default abstract class Bonus extends BoundedEntity {
  constructor(texture: string) {
    super(`/assets/images/PNG/Power-ups/${texture}.png`, 0.03, 0.03)

    this.maxTop = 1
    this.maxBottom = 1
    this.maxLeft = 1
    this.maxRight = 1
  }

  public tick(elapsed: number) {
    this.time += 0.01 * elapsed

    let newX = this.speed * 0.02 * this.directionX
    let newY = this.speed * 0.02 * this.directionY

    this.move(newX, newY)
  }

  protected onCollision(other: Object) {
    if (other instanceof Player) {
      this.actionOnCatch()
      this.clear()
    }
  }

  abstract actionOnCatch(): void
}
