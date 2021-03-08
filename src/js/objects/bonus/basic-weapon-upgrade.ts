import GameManager from '../../game-manager'
import WeaponUpgrade from '../abstract/weapon-upgrade'

export default class BasicWeaponUpgrade extends WeaponUpgrade {
  constructor(position: { x: number; y: number; z: number }) {
    super('blue', position)
  }

  actionOnCatch(): void {
    GameManager.Instance.playerManager.weaponManager.pushUpgrade(this)
  }
}
