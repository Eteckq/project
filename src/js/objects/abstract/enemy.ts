import { getRandomBoolValue, getRandomFloat } from '../../utils/utils'
import Damageable from '../interface/damageable'
import Damager from '../interface/damager'
import GameManager from '../../game-manager'
import BoundedEntity from './bounded-entity'
import PlayerMissile from './player-missile'
import { gl } from '../../utils/gl'
import { Vector3 } from '../../../../node_modules/@math.gl/core/src/index'

export default abstract class Enemy
  extends BoundedEntity
  implements Damageable, Damager {
  public attack: number = 20
  public health: number = 10

  public score: number = 1

  constructor(
    position: Vector3,
    texture: string,
    width: number,
    height: number
  ) {
    super(position, `/assets/images/Enemies/${texture}.png`, width, height)

    GameManager.Instance.waveManager.numberOfEnemies++
    // TODO Not here, but fix transparency
    // this.position[2] = getRandomFloat(0.2, 0.5)
  }

  protected onCollision(other: Object) {
    if (other instanceof PlayerMissile) {
      this.damage(other.attack)
      other.clear()
    }
  }

  public tick(elapsed: number) {
    this.time += 0.01 * elapsed
    this.update()
  }

  abstract update(): void

  damage(amount: number): void {
    this.health -= amount

    if (this.health <= 0) {
      GameManager.Instance.killEnemy(this)
      this.clear()
    }
  }

  public clear() {
    GameManager.Instance.waveManager.numberOfEnemies--
    // clear all GPU memory
    this.loaded = false
    gl.deleteBuffer(this.vertexBuffer)
    gl.deleteBuffer(this.coordBuffer)
    gl.deleteVertexArray(this.vao)
    this.gameManager.removeFromScene(this)
  }
}
