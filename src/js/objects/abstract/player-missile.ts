import Missile from './missile'

export default abstract class PlayerMissile extends Missile {
  constructor(texture: string, width: number, height: number) {
    super(`/assets/images/PNG/Missiles/Player/${texture}.png`, width, height)
  }
}
