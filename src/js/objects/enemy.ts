import { initTexture } from '../utils/utils'
import Rectangle from './abstract/rectangle'
import Damageable from './interface/damageable'
import BasicEnemyMissile from './projectiles/enemy/basicMissile'

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export default class Enemy extends Rectangle implements Damageable {
  protected speed: number = 0.5

  protected directionX: number
  protected directionY: number

  constructor(public health: number = 10, texture = 'Black1') {
    super(0.08, 0.08)
    this.texture = initTexture(
      `/assets/images/PNG/Enemies/enemy${texture}.png`,
      this.width,
      this.height
    )
    this.position[0] = getRandom(-1, 1)
    this.position[1] = getRandom(1, 0.5)
    this.directionX = getRandom(-1, 1)
    this.directionY = getRandom(-1, 1)
  }

  damage(amount: number): void {
    this.health -= amount
  }

  public tick(elapsed: number) {
    this.time += 0.01 * elapsed

    let speed = 0.8

    if (Math.round(Math.random() * 150) === 0) {
      this.shoot()
    }

    if (Math.round(Math.random() * 1000) === 0) {
      this.directionX = -this.directionX
    }
    if (Math.round(Math.random() * 500) === 0) {
      this.directionY = -this.directionY
    }

    let newX = speed * 0.03 * this.directionX
    if (this.position[0] - newX < -1.2 || this.position[0] - newX > 1.2) {
      this.directionX = -this.directionX
      newX = -newX
    }

    let newY = speed * 0.01 * this.directionY
    if (this.position[1] - newY < -0.5 || this.position[1] - newY > 1.2) {
      this.directionY = -this.directionY
      newY = -newY
    }

    // this.position[1] -= newY
    // this.position[0] -= newX
  }
  public shoot() {
    let newSplat = new BasicEnemyMissile(Math.random() * 20 - 10)
    newSplat.setPosition(this.getPosition())
  }

  public getPosition() {
    return {
      x: this.position[0],
      y: this.position[1],
      z: this.position[2],
    }
  }
}
